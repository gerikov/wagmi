import { createConfig, configureChains, mainnet, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { Profile } from './components/Profile/Profile';
import Page from './components/Page/Page';
import { torus } from './Torus';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { createWalletClient, custom } from 'viem';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [torus, mainnet],
  [
    publicProvider(),
    // jsonRpcProvider({
    //   rpc: (chain) => ({
    //     http: chain.rpcUrls.public,
    //   }),
    // }),
  ]
);


// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    // new CoinbaseWalletConnector({
    //   chains,
    //   options: {
    //     appName: 'wagmi',
    //   },
    // }),
    // new InjectedConnector({
    //   chains,
    //   options: {
    //     name: 'Injected',
    //     shimDisconnect: true,
    //   },
    // }),
  ],
  publicClient,
  webSocketPublicClient,
});

function App() {
  return (
    <WagmiConfig config={config}>
      <Page>
        <Profile />
      </Page>
    </WagmiConfig>
  );
}

export default App;
