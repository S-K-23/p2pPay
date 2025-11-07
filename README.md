# P2P Pay

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> A hybrid peer-to-peer payment platform enabling instant off-chain transfers and trustless on-chain settlements using the Solana blockchain.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Testing](#testing)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

**P2P Pay** is a decentralized web application designed to facilitate **instant, zero-fee peer-to-peer payments** off-chain, with the option to **settle accumulated balances on the Solana blockchain**. It merges the **speed and privacy** of direct peer-to-peer transactions with the **security and auditability** of decentralized ledgers.

The system introduces a dual-identity approach:
- A **local Ledger ID** for signing and verifying off-chain IOUs.
- A **Solana wallet** for final on-chain settlement.

---

## Features

- ⚡ **Instant Off-Chain IOUs:** Exchange digital credits instantly via WebRTC, no gas or fees.  
- 🔒 **Non-Custodial:** Users maintain full control; private keys never leave the browser.  
- 💰 **On-Chain Settlement:** Settle credits as real **SOL** on Solana using wallet integrations.  
- 🧩 **Secure Identity Model:** Separate cryptographic keypairs for off-chain vs. on-chain.  
- 🔗 **P2P Communication:** Direct, encrypted WebRTC channels for peer connections.  
- 💾 **Local Persistence:** All off-chain ledgers, peers, and settlements stored securely in IndexedDB.  
- 🖥️ **User-Friendly Interface:** Modern Next.js dashboard with peer management, balances, and transactions.  

---

## Architecture

```
[ User A ]                          [ User B ]
   │                                     │
   │────── Off-Chain IOU (WebRTC) ───────│
   │                                     │
   │────── On-Chain Settlement (SOL) ───▶│
   │                                     │
```

### **System Components**

#### Client Application
- Built using **Next.js 14 + TypeScript + TailwindCSS**.
- Handles wallet connection, peer pairing, and UI rendering.
- Manages ledger state and off-chain signing with Ed25519.

#### P2P Layer
- Built on **WebRTC** with `simple-peer` for encrypted IOU exchange.
- Enables serverless communication via SDP or lightweight signaling.

#### Ledger Engine
- Uses **tweetnacl** for Ed25519 signatures and **IndexedDB** for local storage.
- Ensures deterministic recomputation and replay protection.

#### Solana Integration
- On-chain SOL transfers via `@solana/web3.js` and `@solana/wallet-adapter`.
- Compatible with Phantom, Solflare, and Backpack wallets.

---

## Getting Started

Follow these steps to set up and run **P2P Pay** locally.

### Prerequisites

- **Node.js & npm** (LTS version recommended)  
- **Solana Wallet Extension:**  
  - [Phantom](https://phantom.app/)  
  - [Solflare](https://solflare.com/)  
- **Devnet SOL:** Get test SOL from the [Solana Faucet](https://solfaucet.com).  

---

### Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url> p2p-pay
   cd p2p-pay
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

---

### Running Locally

```bash
npm run dev
```

The app will be available at **http://localhost:3000**.  
Ensure your Solana wallet is connected to **Devnet** for testing.

---

## Testing

To fully simulate peer-to-peer payments:

1. Open **two browsers or profiles**, each with a different Solana wallet.
2. Visit `http://localhost:3000` in both.
3. Connect wallets in each window.
4. Use the **Peer Manager** to exchange Ledger IDs and Solana addresses.
5. Follow the **manual WebRTC handshake** steps:
   - Copy/paste SDP offer and answer between peers.
6. Exchange off-chain IOUs instantly.
7. Trigger **“Settle with SOL”** to perform a live Solana transaction.
8. Verify both:
   - On-chain settlement signature on Solana Explorer.
   - Off-chain ledger balance reset in the UI.

> 💡 **Tip:** Use Devnet SOL to avoid real transaction costs during testing.

---

## Future Improvements

- 🧠 Smart-contract based **escrow and dispute resolution**.  
- 🌐 Multi-peer group settlements.  
- 🔄 Automatic **ledger hash anchoring** to Solana for verification.  
- 📱 Progressive Web App (PWA) version for mobile use.  
- 🌉 **Cross-chain support** for EVM-compatible networks.  
- 🔍 Enhanced peer discovery with decentralized signaling nodes.  

---

## Contributing

Contributions are welcome!  
To contribute:

1. Fork the repository.  
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit and push your changes.
4. Open a Pull Request with a clear description of your update.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

**Author:** Sohum Kashyap  
GitHub: [S-K-23](https://github.com/S-K-23)

For issues, suggestions, or contributions, please open a GitHub issue or reach out directly.

---
