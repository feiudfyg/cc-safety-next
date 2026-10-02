import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import type { BunPlugin } from 'bun';
import pkg from '../package.json';
import { freezeGuiAssetsPlugin, freezeSkillTemplatePlugin } from './gui-assets';

// Bun 1.4.0 intermittently drops the tsconfig `@/*` mapping inside `bun test` (f9671a17).
const aliasPlugin: BunPlugin = {
  name: 'alias',
  setup(build) {
    build.onResolve({ filter: /^@\// }, (args) => ({
      path: Bun.resolveSync(args.path.replace(/^@\//, './src/'), join(import.meta.dir, '..')),
    }));
  },
};

export async function buildRuntimeBundles(outdir: string) {
  const result = await Bun.build({
    entrypoints: [
      'src/entries/index.ts',
      'src/entries/api.ts',
      'src/entries/cli.ts',
      'src/entries/tui.ts',
    ],
    outdir,
    target: 'node',
    splitting: true,
    naming: {
      entry: '[dir]/[name].[ext]',
      chunk: 'chunks/[name]-[hash].[ext]',
    },
    minify: true,
    define: {
      __PKG_VERSION__: JSON.stringify(pkg.version),
    },
    plugins: [aliasPlugin, await freezeGuiAssetsPlugin(), await freezeSkillTemplatePlugin()],
  });
  if (!result.success) return result;
  const bin = await buildBinBundle(outdir);
  return bin.success ? result : bin;
}

const BIN_HOOK_BUNDLE = 'hook.js';
const BIN_CLI_SPECIFIER = '../cli.js';
const BIN_COMPILE_CACHE_LOADER = [
  '#!/usr/bin/env node',
  "'use strict';",
  "const { enableCompileCache } = require('node:module');",
  'if (enableCompileCache !== undefined) {',
  "  const { join } = require('node:path');",
  '  enableCompileCache(',
  '    join(',
  "      process.env.CC_SAFETY_NET_HOME || join(require('node:os').homedir(), '.cc-safety-net'),",
  "      'compile-cache',",
  '    ),',
  '  );',
  '}',
  `require('./${BIN_HOOK_BUNDLE}');`,
  '',
].join('\n');

// Node caches bytecode only for modules compiled after `enableCompileCache` runs, so the module
// that calls it cannot be the bundle.
async function buildBinBundle(outdir: string) {
  const result = await Bun.build({
    entrypoints: ['src/entries/bin.ts'],
    target: 'node',
    format: 'cjs',
    splitting: false,
    minify: true,
    define: {
      __PKG_VERSION__: JSON.stringify(pkg.version),
    },
    plugins: [
      {
        name: 'cli-entry',
        setup(build) {
          build.onResolve({ filter: /^@\/cli\/main$/ }, () => ({
            path: BIN_CLI_SPECIFIER,
            external: true,
          }));
        },
      },
      aliasPlugin,
    ],
  });
  if (!result.success) return result;
  const artifact = result.outputs[0];
  if (!artifact) throw new Error('Bin bundle produced no output');
  const directory = join(outdir, 'bin');
  mkdirSync(directory, { recursive: true });
  await Promise.all([
    Bun.write(join(directory, BIN_HOOK_BUNDLE), await artifact.text()),
    Bun.write(join(directory, 'package.json'), `${JSON.stringify({ type: 'commonjs' })}\n`),
    Bun.write(join(directory, 'cc-safety-net.js'), BIN_COMPILE_CACHE_LOADER),
  ]);
  return result;
}
