import { describe, test } from 'bun:test';
import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { writeTypeScriptConsumer } from '../../scripts/verify-package';
import { withTempDir } from '../helpers';
import { expectTypeScriptProjectCompiles } from '../helpers/typescript';

const PACKAGE_MANIFEST = JSON.stringify({
  name: 'cc-safety-net',
  type: 'module',
  exports: {
    '.': { types: './dist/index.d.ts', import: './dist/index.js' },
    './api': { types: './dist/api.d.ts', import: './dist/api.js' },
    './opencode/v2': { types: './dist/opencode-v2.d.ts', import: './dist/index.js' },
    './package.json': './package.json',
  },
});

function writeInstalledPackage(dir: string) {
  const packageDir = join(dir, 'node_modules', 'cc-safety-net');
  mkdirSync(join(packageDir, 'dist'), { recursive: true });
  copyFileSync('dist/index.d.ts', join(packageDir, 'dist', 'index.d.ts'));
  copyFileSync('dist/api.d.ts', join(packageDir, 'dist', 'api.d.ts'));
  writeFileSync(join(packageDir, 'package.json'), PACKAGE_MANIFEST);
}

describe('package public API', () => {
  test('v1 types need only the v1 peer and reject deep imports', async () => {
    await withTempDir('cc-safety-net-public-api-', (dir) => {
      const peerDir = join(dir, 'node_modules', '@opencode-ai', 'plugin');
      writeInstalledPackage(dir);
      mkdirSync(peerDir, { recursive: true });
      writeFileSync(
        join(peerDir, 'package.json'),
        JSON.stringify({ name: '@opencode-ai/plugin', types: './index.d.ts' }),
      );
      writeFileSync(
        join(peerDir, 'index.d.ts'),
        `export interface PluginInput { directory: string; homeDir?: string }
export type Plugin = (input: PluginInput) => Promise<Record<string, unknown>>;
`,
      );
      const consumer = writeTypeScriptConsumer(
        dir,
        `import plugin, { CCSafetyNetPlugin } from 'cc-safety-net';
import type { Plugin } from '@opencode-ai/plugin';
const named: Plugin = CCSafetyNetPlugin;
const server: Plugin = plugin.server;
void named;
void server;
// @ts-expect-error Root helper exports were intentionally removed.
import { resolveOpenCodeShellRoute } from 'cc-safety-net';
// @ts-expect-error The library function lives on the api subpath, not the root.
import { checkCommand as rootCheckCommand } from 'cc-safety-net';
// @ts-expect-error Deep imports are intentionally rejected by package exports.
import { analyzeCommand } from 'cc-safety-net/dist/core/analyze/index.js';
void resolveOpenCodeShellRoute;
void rootCheckCommand;
void analyzeCommand;
`,
      );

      expectTypeScriptProjectCompiles(consumer);
    });
  });

  test('v2 types need only the v2 peer', async () => {
    await withTempDir('cc-safety-net-public-api-v2-', (dir) => {
      writeInstalledPackage(dir);
      copyFileSync(
        'dist/opencode-v2.d.ts',
        join(dir, 'node_modules/cc-safety-net/dist/opencode-v2.d.ts'),
      );
      const peerDir = join(dir, 'node_modules', '@opencode', 'plugin', 'effect');
      mkdirSync(peerDir, { recursive: true });
      writeFileSync(
        join(peerDir, 'plugin.d.ts'),
        'export interface Plugin { id: string; effect: (context: unknown) => unknown }\n',
      );
      expectTypeScriptProjectCompiles(
        writeTypeScriptConsumer(
          dir,
          `import plugin from 'cc-safety-net/opencode/v2';
import type { Plugin } from '@opencode/plugin/effect/plugin';
const registered: Plugin = plugin;
void registered;
`,
        ),
      );
    });
  });

  test('api subpath types narrow by kind and need no OpenCode peer', async () => {
    await withTempDir('cc-safety-net-public-api-library-', (dir) => {
      writeInstalledPackage(dir);
      const consumer = writeTypeScriptConsumer(
        dir,
        `import { checkCommand, type CheckCommandInput, type CheckCommandResult } from 'cc-safety-net/api';
const input: CheckCommandInput = { command: 'git status', cwd: '/tmp' };
const result: CheckCommandResult = checkCommand(input);
if (result.kind === 'deny') {
  const reason: string = result.reason;
  const ruleId: string | undefined = result.ruleId;
  void reason;
  void ruleId;
}
`,
      );

      expectTypeScriptProjectCompiles(consumer);
    });
  });
});
