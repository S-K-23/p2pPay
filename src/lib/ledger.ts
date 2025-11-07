import { sha256 } from '@noble/hashes/sha256';
import bs58 from 'bs58';
import { sign, verify } from './crypto';
import { fromByteArray, toByteArray } from 'base64-js';

export type TxType = 'credit' | 'settlement';

export interface CreditTx {
  version: 1;
  txid: string;
  from: string; // base58 ledger pubkey
  to: string; // base58 ledger pubkey
  amountCredits: number;
  timestamp: number;
  signature: string; // base64
  txType: TxType;
}

export type BalanceMap = Record<string, number>; // peerId → netCredits

function getTxPayload(tx: Omit<CreditTx, 'txid' | 'signature'>): Uint8Array {
  const payload = `${tx.version}|${tx.from}|${tx.to}|${tx.amountCredits}|${tx.timestamp}|${tx.txType}`;
  return new TextEncoder().encode(payload);
}

export async function createCreditTx(
  fromKeyPair: { publicKey: Uint8Array; secretKey: Uint8Array },
  to: string,
  amountCredits: number,
  txType: TxType = 'credit'
): Promise<CreditTx> {
  const from = bs58.encode(fromKeyPair.publicKey);
  const partialTx = {
    version: 1 as const,
    from,
    to,
    amountCredits,
    timestamp: Date.now(),
    txType,
  };

  const payload = getTxPayload(partialTx);
  const signature = sign(payload, fromKeyPair.secretKey);
  const txidHash = sha256(payload);
  const txid = bs58.encode(txidHash);

  return {
    ...partialTx,
    txid,
    signature: fromByteArray(signature),
  };
}

export function validateCreditTx(tx: CreditTx): boolean {
  // 1. Signature must match sender's ledger key.
  const payload = getTxPayload(tx);
  const signature = toByteArray(tx.signature);
  const fromPublicKey = bs58.decode(tx.from);
  if (!verify(payload, signature, fromPublicKey)) {
    console.error('Invalid signature');
    return false;
  }

  // 2. Amount must be a non-zero integer. For credit tx, must be positive.
  if (!Number.isInteger(tx.amountCredits) || tx.amountCredits === 0) {
    console.error('Invalid amount');
    return false;
  }
  if (tx.txType === 'credit' && tx.amountCredits <= 0) {
    console.error('Credit transaction amount must be positive');
    return false;
  }

  // 3. Deterministic txid check
  const expectedTxid = bs58.encode(sha256(payload));
  if (tx.txid !== expectedTxid) {
    console.error('Invalid txid');
    return false;
  }

  return true;
}

export function computeBalances(
  transactions: CreditTx[],
  ownLedgerId: string
): BalanceMap {
  const balances: BalanceMap = {};

  for (const tx of transactions) {
    const peerId = tx.from === ownLedgerId ? tx.to : tx.from;
    if (!balances[peerId]) {
      balances[peerId] = 0;
    }

    const amount = tx.from === ownLedgerId ? tx.amountCredits : -tx.amountCredits;
    balances[peerId] += amount;
  }

  return balances;
}

export function exportLedger(transactions: CreditTx[]): string {
  return JSON.stringify(transactions, null, 2);
}