'use client';

import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { sendSol, confirmTransaction } from '@/lib/solana';
import { useState } from 'react';
import { PeerData } from '@/store/useLedgerStore';

interface SettlementModalProps {
    peer: PeerData;
    balance: number;
    onClose: () => void;
    onSuccess: (signature: string, amount: number) => void;
}

const SettlementModal: React.FC<SettlementModalProps> = ({ peer, balance, onClose, onSuccess }) => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [solAmount, setSolAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSettle = async () => {
        const amount = parseFloat(solAmount);
        if (isNaN(amount) || amount <= 0) {
            setError('Invalid SOL amount');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const signature = await sendSol(wallet, connection, peer.solAddr, amount);
            await confirmTransaction(connection, signature);
            onSuccess(signature, amount);
        } catch (err) {
            console.error('Settlement failed:', err);
            setError('Settlement failed. See console for details.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Settle with {peer.alias || peer.id.substring(0, 10)}...</h2>
                <p className="mb-4">Current balance: {balance} credits</p>
                <div className="flex flex-col gap-4">
                    <input
                        type="number"
                        placeholder="SOL Amount"
                        value={solAmount}
                        onChange={(e) => setSolAmount(e.target.value)}
                        className="p-2 border rounded"
                    />
                    <button
                        onClick={handleSettle}
                        disabled={isLoading || !wallet.connected}
                        className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                    >
                        {isLoading ? 'Settling...' : 'Settle with SOL'}
                    </button>
                    <button onClick={onClose} className="p-2 bg-gray-500 text-white rounded">
                        Cancel
                    </button>
                </div>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default SettlementModal;