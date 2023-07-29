import Wallet from './components/Wallet';
import Transfer from './components/Transfer';
import { DisplayAccounts } from './components/DisplayAccounts';
import './App.scss';
import { useState } from 'react';
import SignIn from './components/SignIn';

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState('');

  return (
    <div className='app'>
      <SignIn setBalance={setBalance} setAddress={setAddress}/>
      <Wallet
        balance={balance}
        address={address}
      />
      <Transfer setBalance={setBalance} address={address} />
      <DisplayAccounts />
    </div>
  );
}

export default App;
