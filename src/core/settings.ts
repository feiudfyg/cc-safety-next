import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import type { Environment } from '@/core/environment';
import { normalizeMsysDrivePath } from '@/core/paths/canonicalization';
import { getUserSafetyNetHome } from '@/core/policy/paths';

const SETTINGS_FILE = 'settings.json';
const PROMPTS_DIR = 'prompts';
const DISABLE_SEED_ENV = 'CC_SAFETY_NET_NO_SETTINGS_SEED';
const DISABLE_INTERACTION_ENV = 'CC_SAFETY_NET_NO_INTERACTION';
const DEFAULT_INTERACTION_TIMEOUT_SECONDS = 120;

/** @internal */
export interface PluginSettings {
  tempDir?: string;
  promptsDir?: string;
  interaction?: boolean;
  interactionTimeoutSeconds?: number;
}

export function getSettingsPath(environment: Environment): string {
  return join(getUserSafetyNetHome(environment), SETTINGS_FILE);
}

function defaultSettings(environment: Environment) {
  return { temp_dir: environment.tmpdir, prompts_dir: PROMPTS_DIR };
}

export function ensureSettingsFile(environment: Environment): void {
  if (environment.env.has(DISABLE_SEED_ENV)) return;
  const path = getSettingsPath(environment);
  if (existsSync(path)) return;
  try {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, `${JSON.stringify(defaultSettings(environment), null, 2)}\n`, 'utf-8');
  } catch {
    return;
  }
}

function readConfiguredPath(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined;
}

function readConfiguredBoolean(record: Record<string, unknown>, key: string): boolean | undefined {
  const value = record[key];
  return typeof value === 'boolean' ? value : undefined;
}

function readConfiguredNumber(record: Record<string, unknown>, key: string): number | undefined {
  const value = record[key];
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : undefined;
}

export function loadPluginSettings(environment: Environment): PluginSettings {
  const path = getSettingsPath(environment);
  if (!existsSync(path)) return {};
  try {
    const parsed: unknown = JSON.parse(readFileSync(path, 'utf-8'));
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return {};
    const record = parsed as Record<string, unknown>;
    const interaction = readConfiguredBoolean(record, 'interaction');
    const interactionTimeoutSeconds = readConfiguredNumber(record, 'interaction_timeout_seconds');
    return {
      tempDir: readConfiguredPath(record, 'temp_dir'),
      promptsDir: readConfiguredPath(record, 'prompts_dir'),
      ...(interaction === undefined ? {} : { interaction }),
      ...(interactionTimeoutSeconds === undefined ? {} : { interactionTimeoutSeconds }),
    };
  } catch {
    return {};
  }
}

export function getInteractionConfig(environment: Environment): {
  enabled: boolean;
  timeoutMs: number;
} {
  if (environment.env.has(DISABLE_INTERACTION_ENV)) return { enabled: false, timeoutMs: 0 };
  const settings = loadPluginSettings(environment);
  return {
    enabled: settings.interaction ?? true,
    timeoutMs: (settings.interactionTimeoutSeconds ?? DEFAULT_INTERACTION_TIMEOUT_SECONDS) * 1000,
  };
}

export function resolveUserPath(environment: Environment, value: string): string {
  const expanded =
    value === '~'
      ? environment.home
      : value.startsWith('~/') || value.startsWith('~\\')
        ? join(environment.home, value.slice(2))
        : value;
  return resolve(getUserSafetyNetHome(environment), normalizeMsysDrivePath(expanded));
}

export function getPluginTempDir(environment: Environment): string {
  const configured = loadPluginSettings(environment).tempDir;
  return configured === undefined ? environment.tmpdir : resolveUserPath(environment, configured);
}

export function getPromptsDir(environment: Environment): string {
  const configured = loadPluginSettings(environment).promptsDir;
  return configured === undefined
    ? join(getUserSafetyNetHome(environment), PROMPTS_DIR)
    : resolveUserPath(environment, configured);
}
