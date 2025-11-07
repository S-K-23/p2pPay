import nacl from 'tweetnacl';
import { hkdf } from '@panva/hkdf';
import bs58 from 'bs58';

const SALT = 'p2p-pay-ledger-key-salt';

export type KeyPair = nacl.SignKeyPair;

export function generateKeyPair(): KeyPair {
  return nacl.sign.keyPair();
}

export function getPublicKey(keyPair: KeyPair): string {
  return bs58.encode(keyPair.publicKey);
}

export function sign(message: Uint8Array, secretKey: Uint8Array): Uint8Array {
  return nacl.sign.detached(message, secretKey);
}

export function verify(message: Uint8Array, signature: Uint8Array, publicKey: Uint8Array): boolean {
  return nacl.sign.detached.verify(message, signature, publicKey);
}

export async function deriveKey(walletPublicKey: string): Promise<Uint8Array> {
  const ikm = new TextEncoder().encode(walletPublicKey);
  const salt = new TextEncoder().encode(SALT);
  return await hkdf('sha256', ikm, salt, '', 32);
}

export function encrypt(data: Uint8Array, key: Uint8Array): { nonce: Uint8Array; encrypted: Uint8Array } {
  const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
  const encrypted = nacl.secretbox(data, nonce, key);
  return { nonce, encrypted };
}

export function decrypt(encryptedData: Uint8Array, nonce: Uint8Array, key: UintArray): Uint8Array | null {
  return nacl.secretbox.open(encryptedData, nonce, key);
}
