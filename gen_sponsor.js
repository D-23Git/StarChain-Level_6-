import { Keypair } from '@stellar/stellar-sdk';

const pair = Keypair.random();
console.log('PUBLIC=' + pair.publicKey());
console.log('SECRET=' + pair.secret());
