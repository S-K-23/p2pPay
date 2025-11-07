import Peer from 'simple-peer';
import { CreditTx } from './ledger';
import { useLedgerStore } from '@/store/useLedgerStore';

export type MessageType = 'inv' | 'tx' | 'requestTx' | 'ack' | 'state';

export interface Message {
  type: MessageType;
  payload: any;
}

type StoreApi = {
    getState: () => ReturnType<typeof useLedgerStore['getState']>;
    setState: (partial: any) => void;
}

export class PeerConnection {
  private peer: Peer.Instance;
  private store: StoreApi;

  public onConnect: (() => void) | null = null;
  public onClose: (() => void) | null = null;
  public onError: ((err: Error) => void) | null = null;
  public onSignal: ((data: Peer.SignalData) => void) | null = null;

  constructor(initiator: boolean, store: StoreApi) {
    this.peer = new Peer({ initiator });
    this.store = store;

    this.peer.on('signal', (data) => this.onSignal?.(data));
    this.peer.on('connect', () => this.onConnect?.());
    this.peer.on('close', () => this.onClose?.());
    this.peer.on('error', (err) => this.onError?.(err));
    this.peer.on('data', (data) => this.handleData(data));
  }

  private handleData(data: any) {
    try {
        const message: Message = JSON.parse(data.toString());
        const { transactions, addTransaction } = this.store.getState();

        switch (message.type) {
            case 'inv':
                const remoteTxids = message.payload as string[];
                const localTxids = new Set(transactions.map(tx => tx.txid));
                const missingTxids = remoteTxids.filter(id => !localTxids.has(id));
                if (missingTxids.length > 0) {
                    this.requestTransactions(missingTxids);
                }
                break;
            case 'tx':
                const tx = message.payload as CreditTx;
                addTransaction(tx, true);
                break;
            case 'requestTx':
                const requestedTxids = message.payload as string[];
                const txsToSend = transactions.filter(tx => requestedTxids.includes(tx.txid));
                txsToSend.forEach(tx => this.sendTransaction(tx));
                break;
        }
    } catch (error) {
        console.error('Failed to parse incoming message:', error);
    }
  }

  public signal(data: Peer.SignalData) {
    this.peer.signal(data);
  }

  private send(message: Message) {
    this.peer.send(JSON.stringify(message));
  }

  public sendInventory(txids: string[]) {
    this.send({ type: 'inv', payload: txids });
  }

  public sendTransaction(tx: CreditTx) {
    this.send({ type: 'tx', payload: tx });
  }

  public requestTransactions(txids: string[]) {
    this.send({ type: 'requestTx', payload: txids });
  }

  public destroy() {
    this.peer.destroy();
  }
}