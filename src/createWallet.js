//Import dependêncies//
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

//Creating the network//
//bitcoin - mainnet
//testnet - testing networks
const network = bitcoin.networks.testnet;

//HD wallets derivation
const path = `m/49'/1'/0'/0`;

//Create mnemonic for seed//
let mnemonic = bip39.generateMnemonic();
let seed = bip39.mnemonicToSeedSync(mnemonic);

//Making HD wallet root//
let root = bip32.fromSeed(seed, network);

//Create a account - pair priv-pub keys//
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAdress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address;

console.log("Wallet generated.");
console.log("Adress: ", btcAdress);
console.log("Private Key: ", node.toWIF());
console.log("Seed: ", mnemonic);