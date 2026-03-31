import { Keypair, networks } from '@stellar/stellar-sdk';
import fetch from 'node-fetch'; // If available, or use native fetch

const pair = Keypair.random();
const publicKey = pair.publicKey();
const secret = pair.secret();

console.log('--- NEW SPONSOR ACCOUNT ---');
console.log('PUBLIC=' + publicKey);
console.log('SECRET=' + secret);
console.log('---------------------------');

async function fund() {
  try {
    console.log(`Funding ${publicKey} via Friendbot...`);
    const response = await fetch(`https://friendbot.stellar.org/?addr=${publicKey}`);
    const result = await response.json();
    console.log('Funded successfully!');
    process.exit(0);
  } catch (e) {
    console.error('Funding failed:', e.message);
    process.exit(1);
  }
}

fund();
