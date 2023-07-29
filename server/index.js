import express from 'express';
const app = express();
import cors from 'cors';
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  '025309630c7f131d3e9c063eacb152a2b65cdc01f60f575ba109ba55adb12fab62': 100,
  '03ad2f809fd8a1c1ff7a166754b5ed2a01b29277e6f7c7b6b064596a44314cf985': 50,
  '0343abb001e35e74fe0c51c7c35eccb816451c8936a653139ee6ef169460409f6e': 75,
};

// Sample generated publicKey-privateKey pairs for MOCK TESTING ONLY - NOT FOR PRODUCTION USE
const testAccounts = {
  '025309630c7f131d3e9c063eacb152a2b65cdc01f60f575ba109ba55adb12fab62':
    '9ce594e28b9865326ce945b3e21fa869a32a6d236788dc70a8c8845fdefed6a8',
  '03ad2f809fd8a1c1ff7a166754b5ed2a01b29277e6f7c7b6b064596a44314cf985':
    '9a1341bfc9f4887c18b3c47321e37b83fb520d2f467771d85dc826137c2f5f6c',
  '0343abb001e35e74fe0c51c7c35eccb816451c8936a653139ee6ef169460409f6e':
    'c4ecce8f994438bf2d3273053388ab6d3e981c3ead7f77809c6b9704812a8b8b',
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
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: 'Not enough funds!' });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
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
