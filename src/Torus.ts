import { Chain } from 'wagmi';
import testAbi from './abi.json';

export const torus = {
  id: 8194,
  name: 'Torus',
  network: 'Tours',
  nativeCurrency: {
    decimals: 18,
    name: 'Torus',
    symbol: 'qTF',
  },
  rpcUrls: {
    public: { http: ['https://rpc-horn.toruspad.org'] },
    default: { http: ['https://rpc-horn.toruspad.org'] },
  },
  blockExplorers: {
    etherscan: {
      name: 'Blockscout',
      url: 'https://testnet-explorer.toruspad.org/',
    },
    default: {
      name: 'Blockscout',
      url: 'https://testnet-explorer.toruspad.org/',
    },
  },
  // contracts: {
  //   multicall3: {
  //     address: '0xca11bde05977b3631167028862be2a173976ca11',
  //     abi: testAbi,
  //   },
  // },
} as const satisfies Chain;
