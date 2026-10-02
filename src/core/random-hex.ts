import { randomBytes } from 'node:crypto';

export function randomHex16(): string {
  return randomBytes(8).toString('hex');
}
