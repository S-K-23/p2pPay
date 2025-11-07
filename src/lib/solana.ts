import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  SendTransactionError,
} from '@solana/web3.js';
import { WalletContextState } from '@solana/wallet-adapter-react';

export interface SettlementRecord {
  fromSolPubKey: string;
  toSolPubKey: string;
  amountLamports: number;
  signature: string;
  network: 'devnet' | 'mainnet-beta' | 'testnet';
  timestamp: number;
}

export async function sendSol(
  wallet: WalletContextState,
  connection: Connection,
  recipient: string,
  solAmount: number
): Promise<string> {
  if (!wallet.publicKey || !wallet.sendTransaction) {
    throw new Error('Wallet not connected or does not support sending transactions.');
  }

  const lamports = solAmount * LAMPORTS_PER_SOL;
  const recipientPublicKey = new PublicKey(recipient);

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: recipientPublicKey,
      lamports,
    })
  );

  try {
    const signature = await wallet.sendTransaction(transaction, connection);
    console.log('Transaction sent with signature:', signature);
    return signature;
  } catch (error) {
    if (error instanceof SendTransactionError) {
      console.error('Error sending transaction:', error.message, error.logs);
    } else {
      console.error('An unexpected error occurred:', error);
    }
    throw error;
  }
}

export async function confirmTransaction(
  connection: Connection,
  signature: string
): Promise<void> {
  const latestBlockHash = await connection.getLatestBlockhash();
  await connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: signature,
  });
}
