import {
  serialize,
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useDisconnect,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi';

import testAbi from '../../abi.json';
import { useEffect, useState } from 'react';

const Details = () => {
  const { address, connector } = useAccount();
  const { chain, chains } = useNetwork();
  const [latestValidatorId, setLatestValidatorId] = useState('');

  const account = useBalance({
    address: address,
  });
  const { disconnect } = useDisconnect();

  const lastValidator = useContractRead({
    address: '0xfc00face00000000000000000000000000000000',
    abi: testAbi,
    functionName: 'minGasPrice',
    onSuccess(data) {
      setLatestValidatorId(serialize(data));
    },
  });

  console.log(lastValidator.data);

  return (
    <div>
      <div>Balance: {account?.data?.formatted}</div>
      <div>{address}</div>
      <div>Connected to {connector?.name}</div>
      <button onClick={disconnect}>Disconnect</button>
      <div>
        {chain && <div>Connected to {chain.name}</div>}
        {chains && (
          <div>Available chains: {chains.map((chain) => chain.name)}</div>
        )}
      </div>

      <button onClick={async () => await lastValidator.refetch()}>Feed</button>
      <div>test:{latestValidatorId}</div>
    </div>
  );
};
export default Details;
