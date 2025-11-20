'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useLedgerStore } from '@/store/useLedgerStore';
import { useEffect, useState } from 'react';

const WalletConnect = () => {
    const { publicKey } = useWallet();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (publicKey) {
            // Add logic here
        }
    }, [publicKey]);

    if (!mounted) {
        return null; // Render nothing on the server
    }

    return (
        <div className="glass-panel p-4 rounded-xl">
            <div className="[&>button]:neon-button [&>button]:!bg-transparent [&>button]:!font-mono [&>button]:!h-12 [&>button]:!px-6 [&>button]:!rounded-none">
                <WalletMultiButton />
            </div>
            {publicKey && (
                <div className="mt-4 text-xs font-mono text-cyan-400 break-all">
                    <span className="opacity-50">ID:</span> {publicKey.toBase58()}
                </div>
            )}
        </div>
    );
};

export default WalletConnect;
