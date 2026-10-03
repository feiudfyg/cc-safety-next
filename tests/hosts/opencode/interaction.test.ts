import { afterEach, beforeEach, describe, expect, test } from 'bun:test';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createTestEnvironment, type Environment } from '@/core/environment';
import { REASON_SAFETY_NET_FAILED_CLOSED } from '@/core/budget';
import {
  listInteractionRequests,
  touchTuiHeartbeat,
  writeInteractionResponse,
} from '@/core/interaction/protocol';
import { createSessionAllow, type SessionAllow } from '@/core/interaction/session-allow';
import { evaluateOpenCodeTool } from '@/hosts/opencode/plugin';

const originalHome = process.env.CC_SAFETY_NET_HOME;
const originalDisable = process.env.CC_SAFETY_NET_NO_INTERACTION;
const roots: string[] = [];

let home: string;
let tempDir: string;
let environment: Environment;

const route = { kind: 'command', shell: 'posix' } as const;

function createRoot(): string {
  const root = mkdtempSync(join(tmpdir(), 'ccsn-interaction-plugin-'));
  roots.push(root);
  return root;
}

function evaluate(sessionAllow?: SessionAllow) {
  return evaluateOpenCodeTool({
    configCwd: home,
    homeDir: home,
    tool: '',
    sessionID: 's1',
    toolInput: undefined,
    route,
    sessionAllow,
  });
}

async function waitForRequest() {
  for (let attempt = 0; attempt < 200; attempt += 1) {
    const request = listInteractionRequests(environment)[0];
    if (request) return request;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  return undefined;
}

beforeEach(() => {
  home = createRoot();
  tempDir = join(home, 'tmp');
  process.env.CC_SAFETY_NET_HOME = home;
  delete process.env.CC_SAFETY_NET_NO_INTERACTION;
  mkdirSync(home, { recursive: true });
  writeFileSync(
    join(home, 'settings.json'),
    JSON.stringify({ temp_dir: tempDir, interaction_timeout_seconds: 5 }),
  );
  environment = createTestEnvironment({ tmpdir: tempDir });
});

afterEach(() => {
  if (originalHome === undefined) delete process.env.CC_SAFETY_NET_HOME;
  else process.env.CC_SAFETY_NET_HOME = originalHome;
  if (originalDisable === undefined) delete process.env.CC_SAFETY_NET_NO_INTERACTION;
  else process.env.CC_SAFETY_NET_NO_INTERACTION = originalDisable;
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe('OpenCode block interaction', () => {
  test('allows one run when the TUI chooses once', async () => {
    touchTuiHeartbeat(environment);
    const pending = evaluate();

    const request = await waitForRequest();
    if (!request) throw new Error('interaction request was not written');
    expect(request.reason).toBe(REASON_SAFETY_NET_FAILED_CLOSED);
    writeInteractionResponse(environment, { id: request.id, decision: 'once' });

    await expect(pending).resolves.toBeUndefined();
  });

  test('keeps blocking when the TUI rejects', async () => {
    touchTuiHeartbeat(environment);
    const pending = evaluate();

    const request = await waitForRequest();
    if (!request) throw new Error('interaction request was not written');
    writeInteractionResponse(environment, { id: request.id, decision: 'reject' });

    await expect(pending).rejects.toThrow();
  });

  test('blocks without waiting when no TUI is watching', async () => {
    await expect(evaluate()).rejects.toThrow();
  });

  test('remembers a session allowance for later identical blocks', async () => {
    touchTuiHeartbeat(environment);
    const sessionAllow = createSessionAllow();
    const first = evaluate(sessionAllow);

    const request = await waitForRequest();
    if (!request) throw new Error('interaction request was not written');
    writeInteractionResponse(environment, { id: request.id, decision: 'session' });
    await first;

    await expect(evaluate(sessionAllow)).resolves.toBeUndefined();
  });
});
