import { existsSync, readFileSync } from 'node:fs';
import { basename, join, resolve, sep } from 'node:path';
import { stripJsonComments } from '@/core/io/jsonc';
import { type DetectContext, type HookDetection, readRecord } from '@/hosts/detect/context';
import {
  findOpenCodePluginFailure,
  getOpenCodeConfigPaths,
  getOpenCodeV2ConfigPaths,
  hasOpenCodePlugin,
  LOCAL_PACKAGE_NAMES,
} from '@/hosts/opencode/install';

function resolveLocalPlugin(spec: string, cwd: string, home: string): boolean {
  const expanded = spec.startsWith('~') ? join(home, spec.slice(1)) : spec;
  const target = resolve(cwd, expanded);
  if (spec.startsWith('~') && target !== home && !target.startsWith(home + sep)) return false;
  const packagePath = join(target, 'package.json');
  if (!existsSync(packagePath)) return false;
  try {
    const name = readRecord(JSON.parse(readFileSync(packagePath, 'utf-8')), 'name');
    return typeof name === 'string' && LOCAL_PACKAGE_NAMES.has(name);
  } catch {
    return false;
  }
}

export function detect(context: DetectContext): HookDetection {
  const errors: string[] = [];
  for (const configPath of context.openCodeVersion?.startsWith('2.')
    ? getOpenCodeV2ConfigPaths(context.environment)
    : getOpenCodeConfigPaths(context.environment)) {
    if (existsSync(configPath)) {
      try {
        const content = readFileSync(configPath, 'utf-8');
        const json = stripJsonComments(content);
        const config: unknown = JSON.parse(json);

        if (
          hasOpenCodePlugin(config, (spec) =>
            resolveLocalPlugin(spec, context.cwd, context.environment.home),
          )
        ) {
          const failure = findOpenCodePluginFailure(context.openCodePluginListOutput);
          if (failure) {
            return {
              platform: 'opencode',
              status: 'disabled',
              method: 'opencode api plugin.list',
              configPath,
              errors: [...errors, failure],
            };
          }
          return {
            platform: 'opencode',
            status: 'configured',
            method: 'plugin array',
            configPath,
            errors: errors.length > 0 ? errors : undefined,
          };
        }
      } catch (e) {
        errors.push(
          `Failed to parse ${basename(configPath)}: ${e instanceof Error ? e.message : String(e)}`,
        );
      }
    }
  }

  return {
    platform: 'opencode',
    status: 'n/a',
    errors: errors.length > 0 ? errors : undefined,
  };
}
