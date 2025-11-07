'use client';

import WalletConnect from "@/components/WalletConnect";
import { PeerData, useLedgerStore } from '@/store/useLedgerStore';
import { useEffect, useState } from "react";
import PeerManager from "@/components/PeerManager";
import LedgerView from "@/components/LedgerView";
import SettlementModal from "@/components/SettlementModal";
import { useWallet } from "@solana/wallet-adapter-react";
import { PeerData } from "@/store/useLedgerStore";

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
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24 bg-zinc-900 text-white">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-800 bg-gradient-to-b from-zinc-900 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-zinc-800/30 lg:p-4">
          P2P Pay
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-black via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <WalletConnect />
        </div>
      </div>

      {isInitialized ? (
        <div className="w-full max-w-5xl mt-16">
          <PeerManager />
          <LedgerView />
          <div>
            <h3 className="text-lg font-semibold mb-2">Settle Balances</h3>
            {Object.keys(balances).map((peerId) => (
              <button
                key={peerId}
                onClick={() => handleOpenSettlement(peerId)}
                className="p-2 bg-orange-500 text-white rounded mr-2"
                disabled={!dbPeers[peerId]}
              >
                Settle with {dbPeers[peerId]?.alias || peerId.substring(0, 6)}...
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center mt-16">
            <p>Please connect your wallet to begin.</p>
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
