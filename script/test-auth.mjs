import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import nacl from "tweetnacl";

// Generate a fresh test wallet keypair
const keypair = Keypair.generate();
const walletAddress = keypair.publicKey.toBase58();

// This is the exact message the mobile app will send
const message = `Sign in to SwipePay at ${Date.now()}`;
const messageBytes = new TextEncoder().encode(message);

// Sign the message with the wallet's private key
const signature = nacl.sign.detached(messageBytes, keypair.secretKey);
const signatureBase58 = bs58.encode(signature);

console.log(JSON.stringify({
  wallet_address: walletAddress,
  message: message,
  signature: signatureBase58
}, null, 2));