import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
  useWalletClient,
} from 'wagmi';
import Button from '../Button/Button';
import Details from '../Details/Details';
import { useCallback, useEffect } from 'react';
import { torus } from '../../Torus';

import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});
export function Profile() {
  const { chain, chains } = useNetwork();
  const { isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { switchNetworkAsync } = useSwitchNetwork();
  // const { walletClient } = useWalletClient();

  const changeNetwork = useCallback(
    async (chainId) => {
      try {
        await walletClient.addChain({ chain: torus });
        await switchNetworkAsync?.(chainId);
      } catch (error) {
        console.error(error);
      }
    },
    [switchNetworkAsync]
  );

  useEffect(() => {
    if (isConnected && chain?.id !== 8194) {
      changeNetwork(8194);
    }
  }, [chain, changeNetwork, isConnected]);

  if (isConnected) {
    return <Details />;
  }

  return (
    <div>
      {connectors.map((connector) => (
        <Button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </Button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
}
