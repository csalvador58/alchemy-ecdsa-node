import { useState } from "react";
import server from "../server";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { toHex } from "ethereum-cryptography/utils.js";

function SignIn({ address, setAddress, balance, setBalance }) {
    const [privateKeyInput, setPrivateKeyInput] = useState('')
  const onChange = async (evt) => {
    const input = evt.target.value;
    setPrivateKeyInput(input);
  }

  const submitHandler = async () => {
    const publicKey = toHex(secp256k1.getPublicKey(privateKeyInput));
    console.log('publicKey')
    console.log(publicKey)
    if (publicKey) {
      const {
        data: { balance },
      } = await server.get(`balance/${publicKey}`);
      setBalance(balance);
      setAddress(publicKey);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Sign In With Private Key</h1>

      <label>
        Private Key
        <input placeholder="Type in private key" value={privateKeyInput} onChange={onChange}></input>
      </label>
      <button onClick={submitHandler}>Submit</button>
    </div>
  );
}

export default SignIn;
