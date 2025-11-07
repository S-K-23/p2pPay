'use client';

import { useLedgerStore } from '@/store/useLedgerStore';
import { useState } from 'react';

const PeerManager = () => {
    const { connectPeer, addPeer, dbPeers } = useLedgerStore();
    const [peerId, setPeerId] = useState('');
    const [peerSolAddr, setPeerSolAddr] = useState('');
    const [peerAlias, setPeerAlias] = useState('');

    const handleAddPeer = () => {
        if (!peerId || !peerSolAddr) {
            alert('Please enter a Peer ID and Solana Address');
            return;
        }
        addPeer({ id: peerId, solAddr: peerSolAddr, alias: peerAlias });
        setPeerId('');
        setPeerSolAddr('');
        setPeerAlias('');
    };

    const handleConnect = (initiator: boolean) => {
        if (!peerId) {
            alert('Please select a peer to connect to');
            return;
        }
        const peer = connectPeer(peerId, initiator);

        peer.onConnect = () => {
            console.log('Connected to peer:', peerId);
        };

        peer.onError = (err) => {
            console.error('Peer connection error:', err);
        };
    };

    return (
        <div className="w-full max-w-md p-4 my-8 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Peer Manager</h2>
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Add Peer</h3>
                <input
                    type="text"
                    placeholder="Peer's Ledger ID"
                    value={peerId}
                    onChange={(e) => setPeerId(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    type="text"
                    placeholder="Peer's Solana Address"
                    value={peerSolAddr}
                    onChange={(e) => setPeerSolAddr(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    type="text"
                    placeholder="Peer's Alias (optional)"
                    value={peerAlias}
                    onChange={(e) => setPeerAlias(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <button onClick={handleAddPeer} className="w-full p-2 bg-cyan-500 text-white rounded">
                    Add Peer
                </button>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Connect to Peer</h3>
                <select
                    onChange={(e) => setPeerId(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                    value={peerId}
                >
                    <option value="">Select a peer</option>
                    {Object.values(dbPeers).map(p => (
                        <option key={p.id} value={p.id}>{p.alias || p.id.substring(0, 10)}</option>
                    ))}
                </select>
                <div className="flex gap-4 mb-4">
                    <button onClick={() => handleConnect(true)} className="w-full p-2 bg-blue-500 text-white rounded">
                        Initiate Connection
                    </button>
                    <button onClick={() => handleConnect(false)} className="w-full p-2 bg-green-500 text-white rounded">
                        Accept Connection
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PeerManager;
