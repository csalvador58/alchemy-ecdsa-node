const secp = require('ethereum-cryptography/secp256k1');
const { toHex } = require('ethereum-cryptography/utils');
const { keccak256 } = require("ethereum-cryptography/keccak");

// Generate a private key
const privateKey = secp.utils.randomPrivateKey();


// Extract public key from private key
const publicKey = secp.getPublicKey(privateKey)

// Hash public key and use last 20 bytes for wallet address
const walletAddress = keccak256(publicKey.slice(1)).slice(-20)

console.log('private key: ', toHex(privateKey));
console.log('public key: ', toHex(publicKey));
console.log('wallet: ', `0x${toHex(walletAddress)}`);