const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;

const secp = require('ethereum-cryptography/secp256k1');
const { toHex, utf8ToBytes } = require('ethereum-cryptography/utils');
const { keccak256 } = require('ethereum-cryptography/keccak');

app.use(cors());
app.use(express.json());

const balances = {
  '0xe0d7cb39fc8fe780cc2ef04758a07556f6ca24e2': 100,
  '0x56cd1dd0933f5004b0c64a87565d70a176b3dccb': 50,
  '0xdf8846f42a63d1d9408452118325c0bbbc3e1e6b': 75,
};

app.get('/balance/:address', (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', async (req, res) => {
  // TODO: get a signature from the client-side application
  // recover the public address from the signature
  const { sender, recipient, amount, nonce, signTxn } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  // Extract signature and recovery bit from signed transaction
  const [signature, recoveryBit] = signTxn;

  // Format signature to Uint8Array
  const formattedSignature = Uint8Array.from(Object.values(signature));

  // Create massage hash
  // const message = {
  //   sender: address,
  //   amount: parseInt(sendAmount),
  //   recipient,
  //   nonce: nonce,
  // };
  // const msgToString = JSON.stringify(message);
  // console.log('From Index: ' + msgToString);
  const hashedMsg = toHex(keccak256(utf8ToBytes(recipient + amount + JSON.stringify(nonce))));

  // recover public key
  const publicKey = await secp.recoverPublicKey(
    hashedMsg,
    formattedSignature,
    recoveryBit
  );

  // verify transaction
  const verifyTxn = secp.verify(formattedSignature, hashedMsg, publicKey);

  if (!verifyTxn) {
    res.status(400).send({ message: 'Invalid Transaction' });
  }

  if (balances[sender] < amount) {
    res.status(400).send({ message: 'Not enough funds!' });
  } else if (sender == recipient) {
    res.status(400).send({
      message: 'Wallet address incorrect, from and to cannot be the same!',
    });
  } else if (recipient && amount) {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  } else {
    res.status(400).send({ message: 'Something went wrong!' });
  }
});
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
