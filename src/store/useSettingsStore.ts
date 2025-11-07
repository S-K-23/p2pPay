import { create } from 'zustand';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

interface SettingsState {
  network: WalletAdapterNetwork;
  setNetwork: (network: WalletAdapterNetwork) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  network: WalletAdapterNetwork.Devnet, // Default network
  setNetwork: (network) => set({ network }),
}));
