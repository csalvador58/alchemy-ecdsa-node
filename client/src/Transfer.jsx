import { useState } from 'react';
import server from './server';

// etheruem related library
import * as secp from 'ethereum-cryptography/secp256k1';
import { keccak256 } from 'ethereum-cryptography/keccak';
import { toHex, utf8ToBytes } from 'ethereum-cryptography/utils';

function Transfer({ address, privateKey, setBalance, setTransaction }) {
  const [sendAmount, setSendAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const setValue = (setter) => (evt) => setter(evt.target.value);

  // nonce
  const [nonce, setNonce] = useState(0);

  async function transfer(evt) {
    evt.preventDefault();

    // Create massage hash
    // const message = {
    //   sender: address,
    //   amount: parseInt(sendAmount),
    //   recipient,
    //   nonce: nonce,
    // };
    // const msgToString = JSON.stringify(message);

    // console.log("From Transfer: " + msgToString);
    // console.log(typeof msgToString)

    console.log(recipient + sendAmount + JSON.stringify(nonce));
    const hashedMsg = keccak256(
      utf8ToBytes(recipient + sendAmount + JSON.stringify(nonce))
    );

    // Sign message
    const signTxn = await secp.sign(hashedMsg, privateKey, {
      recovered: true,
    });

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        nonce,
        signTxn,
      });

      const dataTxn = {
        time: new Date().toLocaleString(),
        amount: parseInt(sendAmount),
        sender: address,
        recipient,
        nonce: parseInt(nonce),
      };

      setTransaction((prevTransactions) => [...prevTransactions, dataTxn]);
      setBalance(balance);
      setNonce((prevNonce) => prevNonce + 1);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className='container transfer' onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder='1, 2, 3...'
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder='Type an address, for example: 0x2'
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type='submit' className='button' value='Transfer' />
    </form>
  );
}

export default Transfer;
