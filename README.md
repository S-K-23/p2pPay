# P2P Pay – Hybrid Off-Chain + On-Chain Peer-to-Peer Payment Network

P2P Pay is a decentralized application designed to facilitate instant, zero-fee peer-to-peer payments off-chain, with the option to settle accumulated balances on the Solana blockchain. It combines the speed and privacy of off-chain transactions with the trust and auditability of a decentralized ledger.

## ✨ Features

*   **Non-Custodial:** Your funds always remain in your wallet. P2P Pay never holds your keys or assets.
*   **Instant Off-Chain Transactions:** Exchange "IOUs" (credits) with peers instantly and without gas fees.
*   **On-Chain Solana Settlement:** Settle your off-chain balances by transferring actual SOL on the Solana blockchain when desired.
*   **Secure Identity Management:** Uses separate cryptographic keys for off-chain ledger identity, distinct from your Solana wallet.
*   **P2P Communication:** Direct peer-to-peer communication for off-chain transaction exchange and ledger synchronization.
*   **Local Persistence:** All off-chain transactions, peer data, and settlement records are securely stored in your browser's IndexedDB.
*   **User-Friendly Interface:** Connect your Solana wallet, manage peers, view transaction history, and initiate settlements through a simple web interface.

## 💡 Core Concepts

*   **Peer Ledger ID:** Your unique public identifier for the off-chain payment network. This is derived from a local keypair and is used to sign and verify off-chain transactions.
*   **Solana Address:** Your public key on the Solana blockchain, obtained from your connected wallet. This is where actual SOL transfers occur during on-chain settlements.
*   **Alias:** A user-defined, friendly name for your peers, making them easier to identify than long cryptographic IDs.

## 🏗️ Architecture Overview

The application is built as a Next.js 14 application with TypeScript and TailwindCSS, following a hybrid approach:

*   **Client UI/App Layer:** The frontend interface for user interaction, wallet connection, and displaying ledger data.
*   **P2P Layer:** Utilizes WebRTC for direct, encrypted peer-to-peer communication, enabling off-chain IOU exchange and state synchronization.
*   **Ledger Engine:** A deterministic off-chain ledger managing signed IOU transactions, stored locally.
*   **Blockchain Integration:** Connects with Solana wallets and the Solana blockchain for on-chain SOL transfers.
*   **Data Storage:** Leverages IndexedDB for secure, local persistence of off-chain ledger data and encrypted keys.

## 🚀 Getting Started

To run P2P Pay locally, follow these steps:

### Prerequisites

*   **Node.js & npm:** Ensure you have Node.js (LTS recommended) and npm installed.
*   **Solana Wallet:** Install a Solana wallet browser extension (e.g., [Phantom](https://phantom.app/), [Solflare](https://solflare.com/)).
*   **Devnet SOL:** For testing, fund your connected wallet with some Devnet SOL. You can get this from a Solana faucet.

### Installation

1.  **Clone the repository:**
    ```bash
    # Assuming you are in the parent directory of p2p-pay
    git clone <repository-url> p2p-pay
    cd p2p-pay
    ```
    *(Note: If you received the project as a zip or already have the files, navigate directly into the `p2p-pay` directory.)*

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

```bash
npm run dev
```

The application will start on `http://localhost:3000`.

## 🧪 Testing the Application

To fully test the P2P functionality, you will need to simulate two different users. This is best done using two separate browser instances or profiles, each with a unique Solana wallet connected.

1.  **Open two browser instances/profiles** and navigate to `http://localhost:3000` in both.
2.  **Connect a different Solana wallet** to each instance.
3.  **Add Peers:** In each instance, use the "Peer Manager" to add the other user's Ledger ID and Solana Address.
    *   Your Ledger ID is automatically generated and can be found in the browser's developer console (or you can temporarily display it in the UI for testing).
4.  **Establish P2P Connection:**
    *   In one instance, select the peer and click "Initiate Connection". Copy the generated "Your Signal Data".
    *   In the other instance, select the peer, paste the copied signal data into "Paste Peer's Signal Data here", and click "Submit Signal". Copy the newly generated signal data.
    *   Go back to the first instance, paste the second signal data, and click "Submit Signal".
    *   Both instances should now be connected.
5.  **Send Off-Chain Credits:** Use the "Off-Chain Ledger" to send credits between the two connected peers. Observe the instant balance updates.
6.  **Settle On-Chain:** If there's a balance, use the "Settle Balances" section to initiate an on-chain SOL transfer to settle the off-chain debt. Approve the transaction in your wallet.
7.  **Verify Persistence:** Close and reopen your browser tabs. Reconnect your wallets. Your transactions, balances, and peer data should be loaded from local storage.

## 🗺️ Roadmap (Future Enhancements)

*   Group multi-party settlements.
*   Escrow-based smart contracts.
*   Ledger anchoring on Solana for audit trail.
*   Cross-chain (EVM) compatibility layer.
*   Mobile PWA integration.
*   Improved signaling server for easier peer discovery.