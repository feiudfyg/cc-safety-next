import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import type { Environment } from '@/core/environment';
import { getPluginTempDir } from '@/core/settings';
import type { DangerLevel } from './danger';

export type InteractionDecision = 'once' | 'session' | 'reject';

export type InteractionRequest = {
  id: string;
  sessionID: string;
  reason: string;
  danger: DangerLevel;
  createdAt: number;
  toolName?: string;
  command?: string;
  segment?: string;
  ruleId?: string;
  cwd?: string;
};

const INTERACTION_DIR = 'interaction';
const REQUEST_PREFIX = 'req-';
const RESPONSE_PREFIX = 'res-';
const HEARTBEAT_FILE = 'tui-alive';

/** @internal */
export function interactionDir(environment: Environment): string {
  return join(getPluginTempDir(environment), INTERACTION_DIR);
}

function readJson(path: string): unknown {
  try {
    return JSON.parse(readFileSync(path, 'utf-8'));
  } catch {
    return undefined;
  }
}

function isRequest(value: unknown): value is InteractionRequest {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as Record<string, unknown>;
  return typeof record.id === 'string' && typeof record.reason === 'string';
}

function requestPath(environment: Environment, id: string): string {
  return join(interactionDir(environment), `${REQUEST_PREFIX}${id}.json`);
}

function responsePath(environment: Environment, id: string): string {
  return join(interactionDir(environment), `${RESPONSE_PREFIX}${id}.json`);
}

export function writeInteractionRequest(
  environment: Environment,
  request: InteractionRequest,
): void {
  mkdirSync(interactionDir(environment), { recursive: true });
  writeFileSync(requestPath(environment, request.id), `${JSON.stringify(request)}\n`, 'utf-8');
}

export function listInteractionRequests(environment: Environment): InteractionRequest[] {
  const dir = interactionDir(environment);
  if (!existsSync(dir)) return [];
  let names: string[];
  try {
    names = readdirSync(dir);
  } catch {
    return [];
  }
  return names
    .filter((name) => name.startsWith(REQUEST_PREFIX) && name.endsWith('.json'))
    .map((name) => readJson(join(dir, name)))
    .filter(isRequest)
    .sort((a, b) => a.createdAt - b.createdAt);
}

/** @internal */
export function readInteractionRequest(
  environment: Environment,
  id: string,
): InteractionRequest | undefined {
  const value = readJson(requestPath(environment, id));
  return isRequest(value) ? value : undefined;
}

export function writeInteractionResponse(
  environment: Environment,
  response: { id: string; decision: InteractionDecision },
): void {
  mkdirSync(interactionDir(environment), { recursive: true });
  writeFileSync(responsePath(environment, response.id), `${JSON.stringify(response)}\n`, 'utf-8');
}

/** @internal */
export function readInteractionResponse(
  environment: Environment,
  id: string,
): InteractionDecision | undefined {
  const value = readJson(responsePath(environment, id));
  if (typeof value !== 'object' || value === null) return undefined;
  const decision = (value as Record<string, unknown>).decision;
  return decision === 'once' || decision === 'session' || decision === 'reject'
    ? decision
    : undefined;
}

export function clearInteraction(environment: Environment, id: string): void {
  rmSync(requestPath(environment, id), { force: true });
  rmSync(responsePath(environment, id), { force: true });
}

export function touchTuiHeartbeat(environment: Environment): void {
  mkdirSync(interactionDir(environment), { recursive: true });
  writeFileSync(join(interactionDir(environment), HEARTBEAT_FILE), `${Date.now()}\n`, 'utf-8');
}

export function isTuiAlive(environment: Environment, maxAgeMs: number): boolean {
  try {
    return (
      Date.now() - statSync(join(interactionDir(environment), HEARTBEAT_FILE)).mtimeMs <= maxAgeMs
    );
  } catch {
    return false;
  }
}

export async function waitForInteractionDecision(
  environment: Environment,
  id: string,
  options: { timeoutMs: number; pollMs: number; maxAgeMs: number },
): Promise<InteractionDecision | undefined> {
  const deadline = Date.now() + options.timeoutMs;
  while (Date.now() < deadline) {
    const decision = readInteractionResponse(environment, id);
    if (decision !== undefined) return decision;
    if (!isTuiAlive(environment, options.maxAgeMs)) return undefined;
    await delay(options.pollMs);
  }
  return readInteractionResponse(environment, id);
}
