import { readdir, readFile, stat } from 'node:fs/promises';
import { isBuiltin } from 'node:module';
import { posix, relative, resolve } from 'node:path';

function isBuildChunkArtifact(path: string): boolean {
  return /^dist\/chunks\/[A-Za-z0-9_-]+\.js$/.test(path);
}

/** @internal */
export function getRuntimeImportSpecifiers(source: string): string[] {
  return [
    ...source.matchAll(
      /(?:(?<![\w$-])from\s*["']|\bimport\s*\(\s*["']|\brequire\w*\(\s*["'])([^"']+)["']/g,
    ),
  ]
    .map((match) => match[1])
    .filter((specifier): specifier is string => specifier !== undefined);
}

/** @internal */
export function unbundledRuntimeImports(source: string): string[] {
  return [
    ...new Set(getRuntimeImportSpecifiers(source).filter((specifier) => !isBuiltin(specifier))),
  ];
}

async function listFiles(directory: string): Promise<string[]> {
  return (
    await Promise.all(
      (await readdir(directory, { withFileTypes: true })).map(async (entry) => {
        const path = resolve(directory, entry.name);
        if (entry.isDirectory()) return listFiles(path);
        return [relative(process.cwd(), path).replaceAll('\\', '/')];
      }),
    )
  )
    .flat()
    .sort();
}

function getSharedChunkImports(path: string, source: string): string[] {
  return [...source.matchAll(/(?:(?<![\w$-])from\s*|\bimport\s*(?:\(\s*)?)["']([^"']+)["']/g)]
    .map((match) => match[1])
    .filter((specifier): specifier is string => specifier !== undefined)
    .map((specifier) => posix.normalize(posix.join(posix.dirname(path), specifier)))
    .filter((specifier) => isBuildChunkArtifact(specifier));
}

export async function verifyBuildArtifacts(): Promise<string[]> {
  const buildEntryArtifacts = [
    'dist/api.d.ts',
    'dist/api.js',
    'dist/bin/cc-safety-net.js',
    'dist/bin/hook.js',
    'dist/bin/package.json',
    'dist/cli.js',
    'dist/index.d.ts',
    'dist/opencode-v2.d.ts',
    'dist/index.js',
    'dist/tui.d.ts',
    'dist/tui.js',
  ];
  const files = await listFiles(resolve('dist'));
  const unexpected = files.filter(
    (path) => !buildEntryArtifacts.includes(path) && !isBuildChunkArtifact(path),
  );
  const missingEntries = buildEntryArtifacts.filter((path) => !files.includes(path));
  const chunks = files.filter((path) => isBuildChunkArtifact(path));
  if (unexpected.length > 0 || missingEntries.length > 0) {
    throw new Error(`Unexpected build artifacts:\n${files.join('\n')}`);
  }

  const reachableChunks = new Set<string>();
  const pending = buildEntryArtifacts.filter((path) => path.endsWith('.js'));
  const missingChunks = new Set<string>();
  while (pending.length > 0) {
    const path = pending.shift();
    if (!path) break;
    for (const chunk of getSharedChunkImports(path, await readFile(path, 'utf8'))) {
      if (!files.includes(chunk)) {
        missingChunks.add(chunk);
        continue;
      }
      if (reachableChunks.has(chunk)) continue;
      reachableChunks.add(chunk);
      pending.push(chunk);
    }
  }
  if (missingChunks.size > 0) {
    throw new Error(
      `Build artifacts reference missing shared chunks:\n${[...missingChunks].join('\n')}`,
    );
  }
  if (chunks.length === 0) {
    throw new Error('Build artifacts contain no shared chunks');
  }
  const orphanedChunks = chunks.filter((path) => !reachableChunks.has(path));
  if (orphanedChunks.length > 0) {
    throw new Error(
      `Build artifacts contain orphaned shared chunks:\n${orphanedChunks.join('\n')}`,
    );
  }
  if (
    process.platform !== 'win32' &&
    ((await stat('dist/bin/cc-safety-net.js')).mode & 0o777) !== 0o755
  ) {
    throw new Error('dist/bin/cc-safety-net.js must have mode 0755');
  }
  if (!(await readFile('dist/bin/cc-safety-net.js', 'utf8')).startsWith('#!/usr/bin/env node\n')) {
    throw new Error('dist/bin/cc-safety-net.js has the wrong shebang');
  }
  return files;
}
