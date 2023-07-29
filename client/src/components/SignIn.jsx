import { useState } from 'react';
import server from '../server';
import { secp256k1 } from 'ethereum-cryptography/secp256k1.js';
import { toHex } from 'ethereum-cryptography/utils.js';
import { keccak256 } from 'ethereum-cryptography/keccak';

function SignIn({ address, setAddress, setBalance }) {
  const [privateKeyInput, setPrivateKeyInput] = useState('');

  const setValue = (setter) => (evt) => setter(evt.target.value);

  const submitHandler = async () => {
    if (privateKeyInput.length != 64) {
      alert('Invalid Private Key, please try again!');
      setPrivateKeyInput('');
      return;
    }

    const publicKey = secp256k1.getPublicKey(privateKeyInput);
    const walletAddress = '0x'.concat(
      toHex(keccak256(publicKey.slice(1)).slice(-20))
    );
    if (walletAddress) {
      const {
        data: { balance },
      } = await server.get(`balance/${walletAddress}`);
      setBalance(balance);
      setAddress(walletAddress);
    } else {
      setBalance(0);
    }
  };

  const logoutHandler = () => {
    setBalance(0);
    setAddress('');
    setPrivateKeyInput('');
  };

  return (
    <div className='container wallet'>
      <h1>Sign In With Private Key</h1>

      <label>
        Private Key
        <input
          disabled={address}
          placeholder='Type in private key'
          value={privateKeyInput}
          onChange={setValue(setPrivateKeyInput)}
        ></input>
      </label>
      {!address && (
        <button className='button' onClick={submitHandler}>
          Login
        </button>
      )}
      {address && (
        <button className='button logout' onClick={logoutHandler}>
          Logout
        </button>
      )}
    </div>
  );
}

export default SignIn;
