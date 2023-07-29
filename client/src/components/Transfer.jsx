import { useState } from 'react';
import server from '../server';
import { secp256k1 } from 'ethereum-cryptography/secp256k1.js';
import { hexToBytes, toHex, utf8ToBytes } from 'ethereum-cryptography/utils.js';
import { sha256 } from 'ethereum-cryptography/sha256.js';
import { keccak256 } from 'ethereum-cryptography/keccak';

function Transfer({
  address,
  recipient,
  sendAmount,
  setBalance,
  setRecipient,
  setSendAmount,
}) {
  const [requestSign, setRequestSign] = useState(false);
  const [privateKeyInput, setPrivateKeyInput] = useState('');

  const setValue = (setter) => (evt) => setter(evt.target.value);

  const submitHandler = (evt) => {
    evt.preventDefault();

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
    if (privateKeyInput.length != 64) {
      alert('Invalid Private Key, please try again!');
      setPrivateKeyInput('');
      return;
    }
    console.log('privateKeyInput');
    console.log(privateKeyInput);

    try {
      const message = {
        amount: sendAmount,
        recipient: recipient,
        sender: address,
      };

      console.log('message');
      console.log(message);
      const messageHash = sha256(utf8ToBytes(JSON.stringify(message)));
      const publicKey = secp256k1.getPublicKey(privateKeyInput);
      const signature = secp256k1.sign(messageHash, privateKeyInput);
      const signatureStr = JSON.stringify({
        r: signature.r.toString(),
        s: signature.s.toString(),
        recovery: signature.recovery,
      });
      console.log('signatureStr');
      console.log(signatureStr);
      // const isSigned = secp256k1.verify(signature, messageHash, publicKey);

      const {
        data: { balance },
      } = await server.post(`send`, {
        ...message,
        publicKey,
        signatureStr,
      });
      setBalance(balance);
      alert('Transaction Successful!');
    } catch (ex) {
      console.error(ex.message);
      // alert(ex.response.data.message);
    }
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
              type='password'
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
