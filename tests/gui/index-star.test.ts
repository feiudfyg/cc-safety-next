import { afterEach, describe, expect, test } from 'bun:test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fetchStarContext } from '@/gui/index';
import {
  createTempRoot,
  environmentFor,
  isolationEnv,
  removeTempRoots,
} from '../helpers/temp-home';

describe('the GUI star context', () => {
  afterEach(removeTempRoots);

  const anHourAgo = () => new Date(Date.now() - 60 * 60 * 1000).toISOString();

  const seedLogs = (home: string) => {
    const logsDir = join(home, 'logs');
    mkdirSync(logsDir, { recursive: true });
    writeFileSync(
      join(logsDir, 'feed.jsonl'),
      [
        { command: 'rm -rf /', decision: 'deny', sessionId: 's1' },
        { command: 'git push --force', decision: 'deny', sessionId: 's1' },
        { command: 'ls', decision: 'allow', sessionId: 's1' },
      ]
        .map((record) => `${JSON.stringify({ ts: anHourAgo(), ...record })}\n`)
        .join(''),
    );
    return logsDir;
  };

  test('reports the retained blocked total without reaching any upstream service', async () => {
    const root = createTempRoot('gui-star-');
    const home = join(root, 'home');
    mkdirSync(home, { recursive: true });

    const context = await fetchStarContext(environmentFor(home, isolationEnv(home)), {
      logsDir: seedLogs(home),
    });

    expect(context).toStrictEqual({ starred: true, starCount: null, blockedTotal: 2 });
  });
});
