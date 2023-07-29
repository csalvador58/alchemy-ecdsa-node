import Wallet from './components/Wallet';
import Transfer from './components/Transfer';
import { DisplayAccounts } from './components/DisplayAccounts';
import './App.scss';
import { useState } from 'react';
import SignIn from './components/SignIn';

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  return (
    <div className='app'>
      <SignIn
        setBalance={setBalance}
        setAddress={setAddress}
        address={address}
      />
      <Wallet balance={balance} address={address} />
      <Transfer
        address={address}
        recipient={recipient}
        sendAmount={sendAmount}
        setBalance={setBalance}
        setRecipient={setRecipient}
        setSendAmount={setSendAmount}
      />
      <DisplayAccounts />
    </div>
  );
}

export default App;
