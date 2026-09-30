import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import type { Environment } from '@/core/environment';
import { normalizeMsysDrivePath } from '@/core/paths/canonicalization';
import { getUserSafetyNetHome } from '@/core/policy/paths';

const SETTINGS_FILE = 'settings.json';
const PROMPTS_DIR = 'prompts';
const DISABLE_SEED_ENV = 'CC_SAFETY_NET_NO_SETTINGS_SEED';

/** @internal */
export interface PluginSettings {
  tempDir?: string;
  promptsDir?: string;
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

export function loadPluginSettings(environment: Environment): PluginSettings {
  const path = getSettingsPath(environment);
  if (!existsSync(path)) return {};
  try {
    const parsed: unknown = JSON.parse(readFileSync(path, 'utf-8'));
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return {};
    const record = parsed as Record<string, unknown>;
    return {
      tempDir: readConfiguredPath(record, 'temp_dir'),
      promptsDir: readConfiguredPath(record, 'prompts_dir'),
    };
  } catch {
    return {};
  }
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
