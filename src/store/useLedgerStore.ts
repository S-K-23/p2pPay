import create from 'zustand';
import { KeyPair, generateKeyPair, getPublicKey, deriveKey, encrypt, decrypt } from '../lib/crypto';
import { CreditTx, BalanceMap, computeBalances, validateCreditTx, createCreditTx } from '../lib/ledger';
import { PeerConnection } from '../lib/p2p';
import { getLedgerKey, saveLedgerKey, getAllTxs, saveTx, getAllSettlements, saveSettlement, SettlementRecord, savePeer, getAllPeers } from '../lib/db';
import bs58 from 'bs58';

interface PeerData {
  id: string;
  solAddr: string;
  alias: string;
}

interface LedgerState {
  keyPair: KeyPair | null;
  transactions: CreditTx[];
  settlements: SettlementRecord[];
  peers: Record<string, PeerConnection>;
  dbPeers: Record<string, PeerData>;
  balances: BalanceMap;
  isInitialized: boolean;
  init: (walletPublicKey: string) => Promise<void>;
  addTransaction: (tx: CreditTx, fromPeer?: boolean) => void;
  addSettlement: (settlement: SettlementRecord) => void;
  addPeer: (peer: PeerData) => void;
  connectPeer: (peerId: string, initiator: boolean) => PeerConnection;
  disconnectPeer: (peerId: string) => void;
  syncWithPeer: (peerId: string) => void;
}

export const useLedgerStore = create<LedgerState>((set, get) => ({
  keyPair: null,
  transactions: [],
  settlements: [],
  peers: {},
  dbPeers: {},
  balances: {},
  isInitialized: false,

  init: async (walletPublicKey) => {
    if (get().isInitialized) return;

    const encryptionKey = await deriveKey(walletPublicKey);
    const storedKey = await getLedgerKey();
    let keyPair: KeyPair;

    if (storedKey) {
      const secretKey = decrypt(storedKey.encryptedSecretKey.encrypted, storedKey.encryptedSecretKey.nonce, encryptionKey);
      if (!secretKey) {
        throw new Error('Failed to decrypt ledger key. The wallet public key may have changed.');
      }
      const publicKey = bs58.decode(storedKey.publicKey);
      keyPair = { publicKey, secretKey };
    } else {
      keyPair = generateKeyPair();
      const encryptedSecretKey = encrypt(keyPair.secretKey, encryptionKey);
      await saveLedgerKey({
        publicKey: getPublicKey(keyPair),
        encryptedSecretKey,
      });
    }

    const transactions = await getAllTxs();
    const settlements = await getAllSettlements();
    const dbPeers = await getAllPeers();
    const dbPeersMap = dbPeers.reduce((acc, peer) => {
        acc[peer.id] = peer;
        return acc;
    }, {} as Record<string, PeerData>);

    const ownLedgerId = getPublicKey(keyPair);
    const balances = computeBalances(transactions, ownLedgerId);

    set({ keyPair, transactions, settlements, dbPeers: dbPeersMap, balances, isInitialized: true });
  },

  addTransaction: (tx, fromPeer = false) => {
    if (!validateCreditTx(tx)) {
      console.error('Attempted to add invalid transaction:', tx);
      return;
    }
    const { transactions, keyPair, peers } = get();
    if (transactions.some((t) => t.txid === tx.txid)) {
      return; // Do not add duplicate transactions
    }
    const newTransactions = [...transactions, tx];
    const ownLedgerId = keyPair ? getPublicKey(keyPair) : '';
    const newBalances = computeBalances(newTransactions, ownLedgerId);
    set({ transactions: newTransactions, balances: newBalances });
    saveTx(tx);

    // Broadcast to peers if the transaction did not come from a peer
    if (!fromPeer) {
        Object.values(peers).forEach(peer => peer.sendTransaction(tx));
    }
  },

  addSettlement: async (settlement) => {
    const { settlements, balances, keyPair, dbPeers, addTransaction } = get();
    const newSettlements = [...settlements, settlement];
    
    const peerId = Object.values(dbPeers).find(p => p.solAddr === settlement.toSolPubKey)?.id;
    if (!peerId) {
        console.error("Could not find peer with solana address", settlement.toSolPubKey);
        return;
    }

    const balance = balances[peerId];
    if (!balance || !keyPair) return;

    // Create a settlement transaction to zero out the balance.
    // If balance is negative, we owe them, so we create a transaction from us to them.
    // If balance is positive, they owe us, so they should create the transaction.
    // For now, we only handle the case where we are settling a negative balance.
    if (balance < 0) {
        const settlementTx = await createCreditTx(keyPair, peerId, -balance, 'settlement');
        addTransaction(settlementTx);
    } else {
        console.warn("Settlement for a positive balance should be initiated by the other peer.");
    }

    set({ settlements: newSettlements });
    saveSettlement(settlement);
  },

  addPeer: (peer) => {
    const { dbPeers } = get();
    const newDbPeers = { ...dbPeers, [peer.id]: peer };
    set({ dbPeers: newDbPeers });
    savePeer(peer);
  },

  connectPeer: (peerId, initiator) => {
    const peer = new PeerConnection(initiator, { getState: get, setState: set });
    set((state) => ({
      peers: { ...state.peers, [peerId]: peer },
    }));
    return peer;
  },
  disconnectPeer: (peerId) => {
    const { peers } = get();
    if (peers[peerId]) {
      peers[peerId].destroy();
      const newPeers = { ...peers };
      delete newPeers[peerId];
      set({ peers: newPeers });
    }
  },

  syncWithPeer: (peerId) => {
    const { peers, transactions } = get();
    const peer = peers[peerId];
    if (peer) {
      const txids = transactions.map((t) => t.txid);
      peer.sendInventory(txids);
    }
  },
}));