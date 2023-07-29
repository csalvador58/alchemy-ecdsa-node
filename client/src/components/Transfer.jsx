import { useState } from 'react';
import server from '../server';

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [requestSign, setRequestSign] = useState(false);
  const [privateKeyInput, setPrivateKeyInput] = useState('');

  const setValue = (setter) => (evt) => setter(evt.target.value);

  const submitHandler = (evt) => {
    evt.preventDefault();

    console.log('sendAmount');
    console.log(sendAmount.trim().length);
    if (isNaN(sendAmount) || sendAmount.trim().length == 0) {
      alert('Invalid amount!');
      setSendAmount('');
      return;
    }
    if (!recipient.startsWith('0x') || recipient.trim().length !== 42) {
      alert('Invalid Recipient address format!');
      return;
    }
    if (recipient === address) {
      alert(`Invalid Recipient address! Cannot be the same as Sender address.`);
      setRecipient('');
      return;
    }

    setRequestSign(true);
  };

  const onChange = async (evt) => {
    const input = evt.target.value;
    setPrivateKeyInput(input);
  };

  const signTxHandler = async () => {
    console.log('address');
    console.log(address);

    console.log('recipient');
    console.log(recipient);
    console.log('recipient.length');
    console.log(recipient.length);

    // try {
    //   const {
    //     data: { balance },
    //   } = await server.post(`send`, {
    //     sender: address,
    //     amount: parseInt(sendAmount),
    //     recipient,
    //   });
    //   setBalance(balance);
    // } catch (ex) {
    //   alert(ex.response.data.message);
    // }
  };

  const clearHandler = () => {
    setSendAmount('');
    setRecipient('');
    setRequestSign(false);
  };

  if (!address) {
    return null;
  }

  return (
    <form className='container transfer' onSubmit={submitHandler}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          disabled={requestSign}
          placeholder='1, 2, 3...'
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          disabled={requestSign}
          placeholder='Type an address, for example: 0x2'
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      {!requestSign && (
        <input type='submit' className='button' value='Transfer' />
      )}
      {requestSign && (
        <>
          <h1>Please Sign Transaction: </h1>
          <label>
            Private Key
            <input
              placeholder='Type in private key'
              value={privateKeyInput}
              onChange={setValue(setPrivateKeyInput)}
            ></input>
          </label>
          <div>
            <button onClick={signTxHandler} className='button'>
              Click to Sign
            </button>
            <button onClick={clearHandler} className='button'>
              Clear
            </button>
          </div>
        </>
      )}
    </form>
  );
}

export default Transfer;
