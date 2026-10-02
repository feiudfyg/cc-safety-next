import { afterEach, describe, expect, test } from 'bun:test';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createTestEnvironment, type Environment } from '@/core/environment';
import {
  clearInteraction,
  interactionDir,
  isTuiAlive,
  listInteractionRequests,
  readInteractionRequest,
  readInteractionResponse,
  touchTuiHeartbeat,
  waitForInteractionDecision,
  writeInteractionRequest,
  writeInteractionResponse,
} from '@/core/interaction/protocol';

const roots: string[] = [];

function createEnvironment(): Environment {
  const root = mkdtempSync(join(tmpdir(), 'ccsn-interaction-'));
  roots.push(root);
  return createTestEnvironment({ tmpdir: root });
}

function request(id: string, createdAt = 0) {
  return {
    id,
    sessionID: 's1',
    reason: 'blocked',
    danger: 'high' as const,
    createdAt,
  };
}

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe('interaction protocol', () => {
  test('writes, lists oldest-first, and reads requests', () => {
    const environment = createEnvironment();
    writeInteractionRequest(environment, request('a', 2));
    writeInteractionRequest(environment, request('b', 1));

    expect(listInteractionRequests(environment).map((item) => item.id)).toEqual(['b', 'a']);
    expect(readInteractionRequest(environment, 'a')?.reason).toBe('blocked');
  });

  test('ignores malformed request files', () => {
    const environment = createEnvironment();
    mkdirSync(interactionDir(environment), { recursive: true });
    writeFileSync(join(interactionDir(environment), 'req-junk.json'), '{ not json', 'utf-8');

    expect(listInteractionRequests(environment)).toEqual([]);
    expect(readInteractionRequest(environment, 'junk')).toBeUndefined();
  });

  test('round-trips a decision response and clears both files', () => {
    const environment = createEnvironment();
    writeInteractionRequest(environment, request('a'));
    writeInteractionResponse(environment, { id: 'a', decision: 'session' });

    expect(readInteractionResponse(environment, 'a')).toBe('session');

    clearInteraction(environment, 'a');
    expect(readInteractionRequest(environment, 'a')).toBeUndefined();
    expect(readInteractionResponse(environment, 'a')).toBeUndefined();
  });

  test('heartbeat freshness gates liveness', () => {
    const environment = createEnvironment();
    expect(isTuiAlive(environment, 60_000)).toBe(false);

    touchTuiHeartbeat(environment);
    expect(isTuiAlive(environment, 60_000)).toBe(true);
  });

  test('returns the decision written while waiting', async () => {
    const environment = createEnvironment();
    writeInteractionRequest(environment, request('a'));
    touchTuiHeartbeat(environment);
    setTimeout(() => writeInteractionResponse(environment, { id: 'a', decision: 'once' }), 20);

    const decision = await waitForInteractionDecision(environment, 'a', {
      timeoutMs: 2000,
      pollMs: 10,
      maxAgeMs: 60_000,
    });

    expect(decision).toBe('once');
  });

  test('gives up when the TUI heartbeat is missing', async () => {
    const environment = createEnvironment();
    writeInteractionRequest(environment, request('a'));

    const decision = await waitForInteractionDecision(environment, 'a', {
      timeoutMs: 2000,
      pollMs: 10,
      maxAgeMs: 60_000,
    });

    expect(decision).toBeUndefined();
  });
});
