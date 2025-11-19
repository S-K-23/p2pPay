'use client';

import { useLedgerStore } from '@/store/useLedgerStore';
import { useState } from 'react';
import bs58 from 'bs58';

const PeerManager = () => {
    const { connectPeer, disconnectPeer, keyPair, peers, dbPeers } = useLedgerStore();
    const [targetPeerId, setTargetPeerId] = useState('');

    const handleConnect = () => {
        if (!targetPeerId) {
            alert('Please enter a Peer ID');
            return;
        }
        // We'll assume initiator is true for manual connection for now, 
        // or we could add a toggle if needed. 
        // But usually one side initiates.
        const peer = connectPeer(targetPeerId, true);

        peer.onConnect = () => {
            console.log('Connected to peer:', targetPeerId);
            setTargetPeerId('');
        };

        peer.onError = (err) => {
            console.error('Peer connection error:', err);
            alert('Connection failed: ' + err.message);
        };
    };

    return (
        <div className="glass-panel p-6 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6 neon-text">Peer Connection</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Connect to Peer */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-cyan-300">Connect to Peer</h3>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Enter Peer ID"
                            value={targetPeerId}
                            onChange={(e) => setTargetPeerId(e.target.value)}
                            className="flex-1 p-3 rounded bg-black/50 border border-gray-700 focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,243,255,0.3)] outline-none transition-all text-sm font-mono text-white"
                        />
                        <button
                            onClick={handleConnect}
                            className="px-6 py-2 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(0,243,255,0.2)] font-bold"
                        >
                            CONNECT
                        </button>
                    </div>
                </div>

                {/* Your Identity */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-magenta-500" style={{ color: '#ff00ff', textShadow: '0 0 10px #ff00ff' }}>Your Identity</h3>
                    {keyPair ? (
                        <div className="bg-black/50 p-4 rounded border border-gray-800 font-mono text-xs break-all relative group">
                            <div className="text-gray-400 mb-1">Ledger Public Key:</div>
                            <div className="text-cyan-200">{bs58.encode(keyPair.publicKey)}</div>
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-gray-500">
                                (Share this)
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-500 italic">Generating identity...</div>
                    )}
                </div>
            </div>

            {/* Active Peers List */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-cyan-300">Active Uplinks</h3>
                {Object.keys(peers).length === 0 ? (
                    <p className="text-gray-500 text-sm">No active connections. Waiting for peers...</p>
                ) : (
                    <div className="grid grid-cols-1 gap-2">
                        {Object.keys(peers).map((peerId) => (
                            <div key={peerId} className="flex items-center justify-between bg-cyan-900/10 border border-cyan-900/30 p-3 rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_#00ff00]"></div>
                                    <span className="font-mono text-sm text-gray-300">{dbPeers[peerId]?.alias || peerId}</span>
                                </div>
                                <button
                                    onClick={() => disconnectPeer(peerId)}
                                    className="text-xs text-red-400 hover:text-red-300 hover:underline"
                                >
                                    Terminate
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PeerManager;
