import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { CreditTx } from './ledger';
import { SettlementRecord } from './solana';

const DB_NAME = 'p2p-pay-db';
const DB_VERSION = 1;

interface P2PPayDB extends DBSchema {
  creditTxs: {
    key: string;
    value: CreditTx;
    indexes: { from: string; to: string };
  };
  settlements: {
    key: string;
    value: SettlementRecord;
    indexes: { from: string; to: string };
  };
  peers: {
    key: string;
    value: { id: string; solAddr: string; alias: string };
  };
  keys: {
    key: 'ledger';
    value: {
      publicKey: string;
      encryptedSecretKey: {
        nonce: Uint8Array;
        encrypted: Uint8Array;
      };
    };
  };
}

let db: IDBPDatabase<P2PPayDB> | null = null;

async function getDb(): Promise<IDBPDatabase<P2PPayDB>> {
  if (db) {
    return db;
  }

  db = await openDB<P2PPayDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('creditTxs')) {
        const store = db.createObjectStore('creditTxs', { keyPath: 'txid' });
        store.createIndex('from', 'from');
        store.createIndex('to', 'to');
      }
      if (!db.objectStoreNames.contains('settlements')) {
        const store = db.createObjectStore('settlements', { keyPath: 'signature' });
        store.createIndex('from', 'fromSolPubKey');
        store.createIndex('to', 'toSolPubKey');
      }
      if (!db.objectStoreNames.contains('peers')) {
        db.createObjectStore('peers', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('keys')) {
        db.createObjectStore('keys');
      }
    },
  });

  return db;
}

// --- Keys ---
export const getLedgerKey = async () => (await getDb()).get('keys', 'ledger');
export const saveLedgerKey = async (key: P2PPayDB['keys']['value']) => (await getDb()).put('keys', key, 'ledger');

// --- Transactions ---
export const getAllTxs = async () => (await getDb()).getAll('creditTxs');
export const saveTx = async (tx: CreditTx) => (await getDb()).put('creditTxs', tx);

// --- Settlements ---
export const getAllSettlements = async () => (await getDb()).getAll('settlements');
export const saveSettlement = async (settlement: SettlementRecord) => (await getDb()).put('settlements', settlement);

// --- Peers ---
export const getAllPeers = async () => (await getDb()).getAll('peers');
export const savePeer = async (peer: P2PPayDB['peers']['value']) => (await getDb()).put('peers', peer);

// --- Clear Data ---
export const clearAllData = async () => {
  const dbInstance = await getDb();
  await dbInstance.clear('creditTxs');
  await dbInstance.clear('settlements');
  await dbInstance.clear('peers');
  await dbInstance.clear('keys');
};