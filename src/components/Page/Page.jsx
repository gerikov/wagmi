import styles from './Page.module.scss';

// const SMART_CONTRACT_ADDRESS = '0xfc00face00000000000000000000000000000000';
// import contractAbi from '../abi.json';

const Page = ({ children }) => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>{children}</div>
    </div>
  );
};
export default Page;
