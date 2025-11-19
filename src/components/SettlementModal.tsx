'use client';

import { PeerData } from '@/store/useLedgerStore';
import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { sendSol } from '@/lib/solana';

interface SettlementModalProps {
    peer: PeerData;
    balance: number;
    onClose: () => void;
    onSuccess: (signature: string, amount: number) => void;
}

const SettlementModal = ({ peer, balance, onClose, onSuccess }: SettlementModalProps) => {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSettle = async () => {
        if (!wallet.publicKey) return;
        setLoading(true);
        setError(null);

        try {
            // Calculate SOL amount from credits (1 credit = 0.001 SOL for example, or 1:1)
            // Let's assume 1 credit = 0.01 SOL for this demo
            const solAmount = Math.abs(balance) * 0.01;

            const signature = await sendSol(wallet, connection, peer.solAddr, solAmount);
            onSuccess(signature, solAmount);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Settlement failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-sm">
            <div className="glass-panel p-8 rounded-xl max-w-md w-full relative border border-cyan-500/50 shadow-[0_0_30px_rgba(0,243,255,0.2)]">
                <h2 className="text-2xl font-bold mb-6 neon-text text-center">Settle Balance</h2>

                <div className="space-y-6">
                    <div className="bg-black/40 p-4 rounded border border-gray-800">
                        <div className="text-sm text-gray-400 mb-1">Settling with:</div>
                        <div className="font-mono text-cyan-300 text-lg">{peer.alias || peer.id.substring(0, 8)}...</div>
                        <div className="text-xs text-gray-500 font-mono mt-1">{peer.solAddr}</div>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-black/40 rounded border border-gray-800">
                        <span className="text-gray-400">Outstanding:</span>
                        <span className="text-2xl font-bold text-red-400 font-mono">{Math.abs(balance)} CR</span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-black/40 rounded border border-gray-800">
                        <span className="text-gray-400">Est. SOL:</span>
                        <span className="text-2xl font-bold text-white font-mono">{(Math.abs(balance) * 0.01).toFixed(4)} SOL</span>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-900/20 border border-red-500/50 text-red-400 text-sm rounded">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-4 mt-8">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 border border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white transition-all rounded font-mono uppercase tracking-wider"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSettle}
                            disabled={loading}
                            className="flex-1 py-3 bg-cyan-500/10 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all rounded font-mono uppercase tracking-wider font-bold shadow-[0_0_15px_rgba(0,243,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : 'Confirm Pay'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettlementModal;