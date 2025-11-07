'use client';

import { useLedgerStore } from '@/store/useLedgerStore';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const PeerDetailPage = () => {
    const params = useParams();
    const peerId = params.id as string;
    const { transactions, balances, keyPair } = useLedgerStore();

    const peerTransactions = transactions.filter(
        (tx) => tx.from === peerId || tx.to === peerId
    );

    const balance = balances[peerId] || 0;

    return (
        <main className="flex min-h-screen flex-col items-center p-8 md:p-24 bg-zinc-900 text-white">
            <div className="w-full max-w-4xl">
                <Link href="/" className="text-blue-400 hover:underline mb-4 block">&larr; Back to Dashboard</Link>
                <h1 className="text-2xl font-bold mb-4">Ledger with <span className="font-mono text-lg">{peerId}</span></h1>

                <div className="p-4 my-8 border rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Balance</h2>
                    <p className={balance > 0 ? 'text-green-400' : balance < 0 ? 'text-red-400' : ''}>
                        {balance} credits
                    </p>
                    <p className="text-sm text-gray-400">
                        {balance > 0 ? `You are owed ${balance} credits.` : balance < 0 ? `You owe ${-balance} credits.` : 'You are settled up.'}
                    </p>
                </div>

                <div className="p-4 my-8 border rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Transaction History</h2>
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
                                {peerTransactions.map((tx) => (
                                    <tr key={tx.txid} className="border-t">
                                        <td className="p-2 font-mono text-xs">{tx.txid.substring(0, 10)}...</td>
                                        <td className={`p-2 font-mono text-xs ${tx.from === keyPair?.publicKey.toString() ? 'text-red-400' : 'text-green-400'}`}>{tx.from.substring(0, 10)}...</td>
                                        <td className={`p-2 font-mono text-xs ${tx.to === keyPair?.publicKey.toString() ? 'text-green-400' : 'text-red-400'}`}>{tx.to.substring(0, 10)}...</td>
                                        <td className="p-2">{tx.amountCredits}</td>
                                        <td className="p-2">{new Date(tx.timestamp).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PeerDetailPage;
