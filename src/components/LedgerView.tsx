'use client';

import { useLedgerStore } from '@/store/useLedgerStore';
import { createCreditTx } from '@/lib/ledger';
import { useState } from 'react';

const LedgerView = () => {
    const { transactions, balances, keyPair, addTransaction, peers } = useLedgerStore();
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState('');

    const handleCreateTx = async () => {
        if (!keyPair || !to || !amount) {
            alert('Please fill in all fields');
            return;
        }
        const amountNum = parseInt(amount, 10);
        if (isNaN(amountNum) || amountNum <= 0) {
            alert('Invalid amount');
            return;
        }

        const tx = await createCreditTx(keyPair, to, amountNum);
        addTransaction(tx);

        const peer = peers[to];
        if (peer) {
            peer.sendTransaction(tx);
        } else {
            console.warn(`Peer ${to} not connected. Transaction will be synced later.`);
        }

        setTo('');
        setAmount('');
    };

    return (
        <div className="w-full max-w-4xl p-4 my-8 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Off-Chain Ledger</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Balances</h3>
                    <ul>
                        {Object.entries(balances).map(([peerId, balance]) => (
                            <li key={peerId} className="flex justify-between">
                                <span>{peerId.substring(0, 10)}...</span>
                                <span>{balance} credits</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">New Transaction</h3>
                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Recipient Peer ID"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="p-2 border rounded"
                        />
                        <input
                            type="number"
                            placeholder="Amount (credits)"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="p-2 border rounded"
                        />
                        <button onClick={handleCreateTx} className="p-2 bg-green-500 text-white rounded">
                            Send Credits
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Transaction History</h3>
                <div className="max-h-96 overflow-y-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="p-2">TXID</th>
                                <th className="p-2">From</th>
                                <th className="p-2">To</th>
                                <th className="p-2">Amount</th>
                                <th className="p-2">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((tx) => (
                                <tr key={tx.txid} className="border-t">
                                    <td className="p-2 font-mono text-xs">{tx.txid.substring(0, 10)}...</td>
                                    <td className="p-2 font-mono text-xs">{tx.from.substring(0, 10)}...</td>
                                    <td className="p-2 font-mono text-xs">{tx.to.substring(0, 10)}...</td>
                                    <td className="p-2">{tx.amountCredits}</td>
                                    <td className="p-2">{new Date(tx.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LedgerView;
