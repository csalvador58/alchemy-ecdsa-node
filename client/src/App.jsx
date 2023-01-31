import Wallet from './Wallet';
import Transfer from './Transfer';
import Transaction from './transaction';
import './App.scss';
import { useState } from 'react';

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [transaction, setTransaction] = useState([]);

  return (
    <>
      <div className='app'>
        <Wallet
          balance={balance}
          privateKey={privateKey}
          setPrivateKey={setPrivateKey}
          setBalance={setBalance}
          address={address}
          setAddress={setAddress}
        />
        <Transfer
          setBalance={setBalance}
          privateKey={privateKey}
          address={address}
          setTransaction={setTransaction}
        />
      </div>
      <div className='app'>
        <Transaction transaction={transaction} />
      </div>
    </>
  );
}

export default App;
