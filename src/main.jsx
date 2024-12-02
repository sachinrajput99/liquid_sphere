import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Toaster } from "react-hot-toast";
import { defineChain } from "viem";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
//
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();
const crossfi = defineChain({
  id: 4157,
  name: "CrossFi Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "XFI",
    symbol: "XFI",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.ms"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://scan.testnet.ms" },
  },
  testnet: true,
});

export const config = getDefaultConfig({
  appName: "CrowdFunding",
  projectId: "7b5df1bf45a2dda047645331015f1cc1",
  chains: [crossfi],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <WagmiProvider config={config}>
<QueryClientProvider client={queryClient}>
<RainbowKitProvider showRecentTransactions={true}>
  <React.StrictMode>
  <ConnectButton />
        <App > 
         
        </App>
          <Toaster position="bottom-right" reverseOrder={true} />
  </React.StrictMode>,
  </RainbowKitProvider>

  </QueryClientProvider>
  </WagmiProvider>

)
