import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const alchemyId = process.env.REACT_APP_POLYGON_ALCHEMY_ID;

// const { provider, chains } = configureChains(
//   [chain.polygonMumbai],
//   [
//     jsonRpcProvider({
//       rpc: (chain) => ({
//         http: `https://polygon-mumbai.g.alchemy.com/v2/${alchemyId}`,
//         webSocket: `wss://polygon-mumbai.g.alchemy.com/v2/${alchemyId}`,
//       }),
//     }),
//   ]
// );

const { chains, provider } = configureChains(
  [mainnet, polygon, polygonMumbai],
  [
    alchemyProvider({ apiKey: alchemyId }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Todo Dapp",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
     <App />
    </RainbowKitProvider>
   </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
