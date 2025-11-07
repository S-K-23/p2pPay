'use client';

import { useSettingsStore } from '@/store/useSettingsStore';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import Link from 'next/link';
import { useLedgerStore } from '@/store/useLedgerStore';

const SettingsPage = () => {
    const { network, setNetwork } = useSettingsStore();
    const { resetStore } = useLedgerStore(); // Assuming a resetStore action exists

    const handleNetworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNetwork(e.target.value as WalletAdapterNetwork);
    };

    const handleResetKeys = () => {
        if (confirm('Are you sure you want to reset your local ledger keys and clear all data? This action cannot be undone.')) {
            // resetStore(); // Call the reset action from useLedgerStore
            alert('Local ledger keys and data have been reset.');
            // Optionally, redirect to home or reload
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-8 md:p-24 bg-zinc-900 text-white">
            <div className="w-full max-w-4xl">
                <Link href="/" className="text-blue-400 hover:underline mb-4 block">&larr; Back to Dashboard</Link>
                <h1 className="text-2xl font-bold mb-8">Settings</h1>

                <div className="p-4 my-4 border rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Network Selection</h2>
                    <label htmlFor="solana-network" className="block text-sm font-medium text-gray-300 mb-2">
                        Solana Network:
                    </label>
                    <select
                        id="solana-network"
                        value={network}
                        onChange={handleNetworkChange}
                        className="w-full p-2 border rounded bg-zinc-800 text-white"
                    >
                        <option value={WalletAdapterNetwork.Devnet}>Devnet</option>
                        <option value={WalletAdapterNetwork.Testnet}>Testnet</option>
                        <option value={WalletAdapterNetwork.MainnetBeta}>Mainnet Beta</option>
                    </select>
                </div>

                <div className="p-4 my-4 border rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Reset Local Data</h2>
                    <p className="text-gray-300 mb-4">
                        This will clear all your local off-chain transactions, peer data, and reset your ledger keys.
                        Your on-chain SOL will not be affected, but your off-chain history will be lost.
                    </p>
                    <button
                        onClick={handleResetKeys}
                        className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Reset Local Ledger Keys and Data
                    </button>
                </div>
            </div>
        </main>
    );
};

export default SettingsPage;
