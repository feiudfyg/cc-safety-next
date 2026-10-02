import { afterEach, describe, expect, test } from 'bun:test';
import { mkdirSync } from 'node:fs';
import { request as httpRequest } from 'node:http';
import { join } from 'node:path';
import { createPolicyGuiServer } from '@/gui/index';
import {
  createTempRoot,
  environmentFor,
  isolationEnv,
  removeTempRoots,
} from '../helpers/temp-home';

afterEach(removeTempRoots);

async function withServer(run: (server: { origin: string; token: string }) => Promise<void>) {
  const root = createTempRoot('gui-hardening-');
  const home = join(root, 'home');
  mkdirSync(home, { recursive: true });
  const server = await createPolicyGuiServer(() => environmentFor(home, isolationEnv(home)), {
    cwd: root,
  });
  try {
    await run(server);
  } finally {
    await server.close();
  }
}

function rawStatus(port: number, path: string, headers: Record<string, string>): Promise<number> {
  return new Promise((resolve, reject) => {
    const request = httpRequest({ host: '127.0.0.1', port, path, headers }, (response) => {
      response.resume();
      response.on('end', () => resolve(response.statusCode ?? 0));
    });
    request.on('error', reject);
    request.end();
  });
}

describe('policy GUI server hardening', () => {
  test('the removed install route is no longer served', async () => {
    await withServer(async (server) => {
      const response = await fetch(
        `${server.origin}/api/install?token=${encodeURIComponent(server.token)}`,
        {
          method: 'POST',
          headers: { 'x-cc-safety-net-token': server.token },
          body: JSON.stringify({ target: 'opencode' }),
        },
      );
      expect(response.status).toBe(404);
    });
  });

  test('security headers accompany the page', async () => {
    await withServer(async (server) => {
      const response = await fetch(`${server.origin}/?token=${encodeURIComponent(server.token)}`);
      expect(response.headers.get('x-content-type-options')).toBe('nosniff');
      expect(response.headers.get('referrer-policy')).toBe('no-referrer');
      expect(response.headers.get('content-security-policy')).toContain("default-src 'self'");
    });
  });

  test('a non-loopback Host header is refused before the token is considered', async () => {
    await withServer(async (server) => {
      const port = Number(new URL(server.origin).port);
      const path = `/?token=${encodeURIComponent(server.token)}`;
      expect(await rawStatus(port, path, { host: 'evil.example' })).toBe(403);
      expect(await rawStatus(port, path, { host: `127.0.0.1:${port}` })).toBe(200);
    });
  });
});
