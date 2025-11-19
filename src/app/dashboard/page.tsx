'use client';

import WalletConnect from "@/components/WalletConnect";
import { PeerData, useLedgerStore } from '@/store/useLedgerStore';
import Link from 'next/link';
import { useEffect, useState } from "react";
import PeerManager from "@/components/PeerManager";
import LedgerView from "@/components/LedgerView";
import SettlementModal from "@/components/SettlementModal";
import { useWallet } from "@solana/wallet-adapter-react";
import Background from "@/components/Background";

export default function Home() {
  const { init, isInitialized, balances, addSettlement, dbPeers } = useLedgerStore();
  const { publicKey } = useWallet();
  const [settlingPeer, setSettlingPeer] = useState<PeerData | null>(null);

  useEffect(() => {
    if (publicKey && !isInitialized) {
      init(publicKey.toBase58());
    }
  }, [publicKey, isInitialized, init]);

  const handleOpenSettlement = (peerId: string) => {
    setSettlingPeer(dbPeers[peerId]);
  };

  const handleCloseSettlement = () => {
    setSettlingPeer(null);
  };

  const handleSettlementSuccess = (signature: string, amount: number) => {
    if (!publicKey || !settlingPeer) return;
    const settlement = {
      fromSolPubKey: publicKey.toBase58(),
      toSolPubKey: settlingPeer.solAddr,
      amountLamports: amount * 1e9,
      signature,
      network: 'devnet' as const,
      timestamp: Date.now(),
    };
    addSettlement(settlement);
    setSettlingPeer(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-12 relative">
      <Background />

      {/* Header */}
      <div className="z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 border-2 border-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.5)]">
            <div className="w-8 h-8 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter neon-text italic">P2P PAY</h1>
        </div>

        <div className="flex items-center gap-4">
          <WalletConnect />
          <Link href="/settings" className="glass-panel px-6 py-3 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all font-mono uppercase text-sm border border-cyan-400/30">
            Settings
          </Link>
        </div>
      </div>

      {isInitialized ? (
        <div className="w-full max-w-6xl grid grid-cols-1 xl:grid-cols-3 gap-8 animate-fade-in">
          {/* Left Column: Peer Manager */}
          <div className="xl:col-span-1">
            <PeerManager />

            {/* Settle Actions */}
            <div className="glass-panel p-6 rounded-xl mt-8">
              <h3 className="text-lg font-semibold mb-4 text-cyan-300">Settlement Ops</h3>
              <div className="space-y-2">
                {Object.keys(balances).filter(id => balances[id] < 0).length === 0 ? (
                  <p className="text-gray-500 text-sm">No debts to settle.</p>
                ) : (
                  Object.keys(balances).filter(id => balances[id] < 0).map((peerId) => (
                    <button
                      key={peerId}
                      onClick={() => handleOpenSettlement(peerId)}
                      className="w-full p-3 bg-red-500/10 border border-red-500 text-red-400 hover:bg-red-500 hover:text-white rounded transition-all font-mono text-sm flex justify-between items-center group"
                      disabled={!dbPeers[peerId]}
                    >
                      <span>PAY {dbPeers[peerId]?.alias || peerId.substring(0, 6)}...</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Ledger View */}
          <div className="xl:col-span-2">
            <LedgerView />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-24 text-center space-y-6 animate-pulse">
          <div className="text-2xl font-mono text-cyan-300">SYSTEM LOCKED</div>
          <p className="text-gray-400 max-w-md">Connect your Solana wallet to initialize the neural ledger interface.</p>
        </div>
      )}

      {settlingPeer && (
        <SettlementModal
          peer={settlingPeer}
          balance={balances[settlingPeer.id]}
          onClose={handleCloseSettlement}
          onSuccess={handleSettlementSuccess}
        />
      )}
    </main>
  );
}
