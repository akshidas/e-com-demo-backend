import { readFileSync } from 'fs';
import path from 'path';
export const PRIVATE_KEY = readFileSync(
  path.join(__dirname, '../keypair.pem'),
  'utf8',
);
