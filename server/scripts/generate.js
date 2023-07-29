import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { toHex } from "ethereum-cryptography/utils.js";
import {keccak256} from "ethereum-cryptography/keccak";

const privateKey = secp256k1.utils.randomPrivateKey();

console.log('private key:', toHex(privateKey));

const publicKey = secp256k1.getPublicKey(privateKey);

const walletAddress = '0x'.concat(toHex(keccak256(publicKey.slice(1)).slice(-20)));

console.log('wallet address:', walletAddress);

