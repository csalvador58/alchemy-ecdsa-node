import express from 'express';
const app = express();
import cors from 'cors';
import { secp256k1 } from 'ethereum-cryptography/secp256k1.js';
import { hexToBytes, toHex, utf8ToBytes } from 'ethereum-cryptography/utils.js';
import { sha256 } from 'ethereum-cryptography/sha256.js';
import { keccak256 } from 'ethereum-cryptography/keccak';
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  '0xc20d9e8385bcb8e9ab6aef10af2e578ecb24b5d0': 100,
  '0x9993a26e1400b9c234d8a9e826b9ebd307b37be2': 50,
  '0x7fb143ff35ed9df5b0889895da4615c8b7f4ddb0': 75,
};

// Sample generated wallet-privateKey pairs for MOCK TESTING ONLY - NOT FOR PRODUCTION USE
const testAccounts = {
  '0xc20d9e8385bcb8e9ab6aef10af2e578ecb24b5d0':
    '77772a19ea2e0b358c26b2ef2dd7d9ca95a168aea2069d03018f64d9439fb119',
  '0x9993a26e1400b9c234d8a9e826b9ebd307b37be2':
    'a1550c63ad528cf25344e5646a152d36ef3a20177b814cf82b90566d8e6d1de6',
  '0x7fb143ff35ed9df5b0889895da4615c8b7f4ddb0':
    '0ce8c19e92ac3f8f2740cf429044483e9d2f261470eedf4cb86b018fc79d15e5',
};

app.get('/accounts', (req, res) => {
  res.json({ testAccounts });
});

app.get('/balance/:address', (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  const { sender, recipient, amount, publicKey, signatureStr } = req.body;
  // console.log('sender')
  // console.log(sender)
  // console.log('recipient')
  // console.log(recipient)
  // console.log('amount')
  // console.log(amount)
  console.log('publicKey');
  console.log(publicKey);
  console.log('JSON.parse(publicKey)');
  console.log(utf8ToBytes(JSON.stringify(publicKey)));
  // console.log('signatureStr')
  // console.log(signatureStr)
  // console.log('JSON.parse(signatureStr)')
  // console.log(JSON.parse(signatureStr))
  const signatureObj = JSON.parse(signatureStr);

  const signature = {
    r: BigInt(signatureObj.r),
    s: BigInt(signatureObj.s),
    recovery: signatureObj.recovery,
  };

  // console.log('signature');
  // console.log(signature);

  const message = {
    amount: amount,
    recipient: recipient,
    sender: sender,
  };
  console.log('message - backend');
  console.log(message);
  const messageHash = sha256(utf8ToBytes(String(message)));

  const isSigned = secp256k1.verify(
    signature,
    messageHash,
    utf8ToBytes(String(publicKey))
  );

  console.log('isSigned');
  console.log(isSigned);

  // if (isSigned) {
  //   setInitialBalance(sender);
  //   setInitialBalance(recipient);

  //   if (balances[sender] < amount) {
  //     res.status(400).send({ message: 'Not enough funds!' });
  //   } else {
  //     balances[sender] -= parseInt(amount);
  //     balances[recipient] += parseInt(amount);
  //     res.send({ balance: balances[sender] });
  //   }
  // } else {
  //   res.status(400).send({ message: "Invalid signature!" });
  // }
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
