import { readFileSync } from 'fs';
export const PRIVATE_KEY = readFileSync('./keypair.pem', 'utf8');
