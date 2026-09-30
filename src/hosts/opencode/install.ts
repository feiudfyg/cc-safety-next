import { join } from 'node:path';
import type { Environment } from '@/core/environment';
import { readRecord } from '@/hosts/detect/context';

const OPENCODE_PACKAGE = 'cc-safety-net';
const OPENCODE_CONFIG_FILES = ['opencode.json', 'opencode.jsonc'] as const;

function getOpenCodeXdgConfigDir(environment: Environment) {
  return join(
    environment.env.get('XDG_CONFIG_HOME') || join(environment.home, '.config'),
    'opencode',
  );
}

/** @internal */
export function getOpenCodeConfigDir(environment: Environment) {
  return environment.env.get('OPENCODE_CONFIG_DIR') || getOpenCodeXdgConfigDir(environment);
}

export function getOpenCodeV2ConfigPaths(environment: Environment) {
  return OPENCODE_CONFIG_FILES.map((filename) => join(getOpenCodeConfigDir(environment), filename));
}

export function getOpenCodeConfigPaths(environment: Environment) {
  return [
    ...new Set([getOpenCodeConfigDir(environment), getOpenCodeXdgConfigDir(environment)]),
  ].flatMap((directory) => OPENCODE_CONFIG_FILES.map((filename) => join(directory, filename)));
}

export function findOpenCodePluginFailure(pluginListOutput: string | null | undefined) {
  const states = readOpenCodePluginStates(pluginListOutput);
  if (states.some(isActivePluginState)) return undefined;
  const failure = states.find((state) => readRecord(state, 'status') === 'failed');
  if (!failure) return undefined;
  return `OpenCode reports cc-safety-net failed: ${String(readRecord(failure, 'error')).split('\n')[0]}`;
}

function readOpenCodePluginStates(pluginListOutput: string | null | undefined) {
  return readPluginInventory(pluginListOutput)
    .filter(
      (row) =>
        readRecord(row, 'id') === OPENCODE_PACKAGE ||
        isManagedPlugin(readRecord(readRecord(row, 'source'), 'target')),
    )
    .map((row) => readRecord(row, 'state'));
}

function isActivePluginState(state: unknown) {
  return readRecord(state, 'status') === 'active';
}

function readPluginInventory(output: string | null | undefined): unknown[] {
  if (!output) return [];
  try {
    const rows = readRecord(JSON.parse(output), 'data');
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}

export function hasOpenCodePlugin(config: unknown, resolveLocalPlugin?: LocalPluginResolver) {
  return ['plugin', 'plugins'].some((key) => {
    const plugins = readRecord(config, key);
    if (!Array.isArray(plugins)) return false;
    return plugins.some((plugin) => {
      if (isManagedPlugin(plugin)) return true;
      const spec = pluginSpec(plugin);
      return (
        resolveLocalPlugin !== undefined &&
        typeof spec === 'string' &&
        looksLikePluginPath(spec) &&
        resolveLocalPlugin(spec)
      );
    });
  });
}

/** @internal */
export const LOCAL_PACKAGE_NAMES = new Set([OPENCODE_PACKAGE, '@local/cc-safety-net']);

export type LocalPluginResolver = (spec: string) => boolean;

function pluginSpec(plugin: unknown): unknown {
  return typeof plugin === 'string' ? plugin : readRecord(plugin, 'package');
}

function looksLikePluginPath(spec: string): boolean {
  return spec.startsWith('.') || spec.startsWith('~') || /[\\/]/.test(spec);
}

function isManagedPlugin(plugin: unknown) {
  const spec = pluginSpec(plugin);
  return (
    typeof spec === 'string' &&
    (LOCAL_PACKAGE_NAMES.has(spec) || spec.startsWith(`${OPENCODE_PACKAGE}@`))
  );
}
