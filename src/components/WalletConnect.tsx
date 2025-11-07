'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useLedgerStore } from '@/store/useLedgerStore';
import { useEffect, useState } from 'react';

const WalletConnect = () => {
    const { publicKey } = useWallet();
    const { generateAndStoreKeyPair } = useLedgerStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (publicKey) {
            // The keypair generation is now triggered from the main page
            // but we can also add logic here if needed when the wallet is connected.
        }
    }, [publicKey, generateAndStoreKeyPair]);

    if (!mounted) {
        return null; // Render nothing on the server
    }

    return (
        <div>
            <WalletMultiButton />
            {publicKey && <p className="text-sm mt-2">Connected: {publicKey.toBase58()}</p>}
        </div>
    );
};

export default WalletConnect;