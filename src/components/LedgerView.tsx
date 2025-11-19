'use client';

import { useLedgerStore } from '@/store/useLedgerStore';

const LedgerView = () => {
    const { transactions, balances, dbPeers } = useLedgerStore();

    return (
        <div className="glass-panel p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6 neon-text">Ledger State</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Balances */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-cyan-300">Net Positions</h3>
                    {Object.keys(balances).length === 0 ? (
                        <p className="text-gray-500 text-sm">No active balances.</p>
                    ) : (
                        <div className="space-y-2">
                            {Object.entries(balances).map(([peerId, amount]) => (
                                <div key={peerId} className="flex justify-between items-center bg-black/40 p-3 rounded border border-gray-800">
                                    <span className="font-mono text-xs text-gray-400" title={peerId}>
                                        {dbPeers[peerId]?.alias || peerId.substring(0, 8) + '...'}
                                    </span>
                                    <span className={`font-bold font-mono ${amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {amount > 0 ? '+' : ''}{amount} CR
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Transaction History */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-cyan-300">Transaction Log</h3>
                    <div className="space-y-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                        {transactions.length === 0 ? (
                            <p className="text-gray-500 text-sm">No transactions recorded.</p>
                        ) : (
                            transactions.slice().reverse().map((tx) => (
                                <div key={tx.txid} className="bg-black/40 p-3 rounded border border-gray-800 text-xs">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-gray-500 font-mono">{new Date(tx.timestamp).toLocaleTimeString()}</span>
                                        <span className={`font-bold ${tx.txType === 'settlement' ? 'text-yellow-400' : 'text-cyan-400'}`}>
                                            {tx.txType.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center font-mono">
                                        <div className="flex flex-col">
                                            <span className="text-gray-400">From: {tx.from.substring(0, 6)}...</span>
                                            <span className="text-gray-400">To: {tx.to.substring(0, 6)}...</span>
                                        </div>
                                        <span className="text-lg font-bold text-white">{tx.amountCredits}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LedgerView;
