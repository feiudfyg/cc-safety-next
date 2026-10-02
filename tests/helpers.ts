import { afterAll } from 'bun:test';
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { listAuditLogFiles } from '@/audit/reader';
import type { AuditLogEntry } from '@/core/audit';
import { withProcessEnv } from './helpers/temp-home';

export function readAuditLogEntriesForSession(homeDir: string, sessionId: string): AuditLogEntry[] {
  return listAuditLogFiles(join(homeDir, '.cc-safety-net', 'logs'))
    .flatMap((file) =>
      readFileSync(file, 'utf8')
        .split('\n')
        .filter(Boolean)
        .map((line) => JSON.parse(line) as AuditLogEntry),
    )
    .filter((entry) => entry.sessionId === sessionId);
}

export function withEnv<T>(env: Record<string, string | undefined>, fn: () => T): T {
  return withProcessEnv(
    env.HOME !== undefined && env.CC_SAFETY_NET_AUDIT_HOME === undefined
      ? { ...env, CC_SAFETY_NET_AUDIT_HOME: env.HOME }
      : env,
    fn,
  );
}

export function createSpawnEnv(overrides: Record<string, string>) {
  const overriddenNames = new Set(
    Object.keys(overrides).map((name) =>
      process.platform === 'win32' ? name.toLowerCase() : name,
    ),
  );
  return {
    ...Object.fromEntries(
      Object.entries(process.env).filter(
        (entry): entry is [string, string] =>
          entry[1] !== undefined &&
          !overriddenNames.has(process.platform === 'win32' ? entry[0].toLowerCase() : entry[0]),
      ),
    ),
    ...overrides,
  };
}

export async function withTempDir<T>(prefix: string, fn: (dir: string) => T | Promise<T>) {
  const dir = mkdtempSync(join(tmpdir(), prefix));
  try {
    const result = await fn(dir);
    return result;
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function toShellPath(p: string): string {
  return p.replace(/\\/g, '/');
}

export function quoteShellPath(p: string): string {
  return `'${toShellPath(p).replaceAll("'", `'\\''`)}'`;
}

export interface LinkedWorktreeFixture {
  rootDir: string;
  mainWorktree: string;
  linkedWorktree: string;
  cleanup: () => void;
}

export function runGit(args: readonly string[], cwd: string): void {
  execFileSync('git', [...args], {
    cwd,
    stdio: 'ignore',
    env: {
      ...process.env,
      GIT_AUTHOR_NAME: 'CC Safety Net Test',
      GIT_AUTHOR_EMAIL: 'safety-net@example.test',
      GIT_COMMITTER_NAME: 'CC Safety Net Test',
      GIT_COMMITTER_EMAIL: 'safety-net@example.test',
    },
  });
}

let linkedWorktreeSeed: { rootDir: string; repository: string } | undefined;

function getLinkedWorktreeSeed(): string {
  if (linkedWorktreeSeed) return linkedWorktreeSeed.repository;

  const rootDir = mkdtempSync(
    join(process.env.CC_SAFETY_NET_TEST_TMPDIR ?? tmpdir(), 'safety-net-worktree-seed-'),
  );
  afterAll(() => {
    rmSync(rootDir, { recursive: true, force: true });
    linkedWorktreeSeed = undefined;
  });
  const repository = join(rootDir, 'repository');
  mkdirSync(repository);
  runGit(['init'], repository);
  writeFileSync(join(repository, 'file.txt'), 'initial\n');
  runGit(['add', 'file.txt'], repository);
  runGit(['-c', 'commit.gpgsign=false', 'commit', '-m', 'initial'], repository);
  linkedWorktreeSeed = { rootDir, repository };
  return repository;
}

export function createLinkedWorktreeFixture(): LinkedWorktreeFixture {
  const rootDir = mkdtempSync(
    join(process.env.CC_SAFETY_NET_TEST_TMPDIR ?? tmpdir(), 'safety-net-worktree-'),
  );
  const mainWorktree = join(rootDir, 'main');
  const linkedWorktree = join(rootDir, 'linked');

  runGit(['clone', '--local', getLinkedWorktreeSeed(), mainWorktree], rootDir);
  runGit(['worktree', 'add', '-b', 'feature/worktree-test', linkedWorktree], mainWorktree);

  return {
    rootDir,
    mainWorktree,
    linkedWorktree,
    cleanup: () => {
      rmSync(rootDir, { recursive: true, force: true });
    },
  };
}

export async function withLinkedWorktreeFixture<T>(
  fn: (fixture: LinkedWorktreeFixture) => T | Promise<T>,
) {
  const fixture = createLinkedWorktreeFixture();
  try {
    const result = await fn(fixture);
    return result;
  } finally {
    fixture.cleanup();
  }
}

process.on('exit', () => {
  if (linkedWorktreeSeed) rmSync(linkedWorktreeSeed.rootDir, { recursive: true, force: true });
});

export interface FakeGitFileFixture {
  rootDir: string;
  cwd: string;
  cleanup: () => void;
}

export function createSubmoduleLikeGitFileFixture(): FakeGitFileFixture {
  const rootDir = mkdtempSync(
    join(process.env.CC_SAFETY_NET_TEST_TMPDIR ?? tmpdir(), 'safety-net-submodule-like-'),
  );
  const cwd = join(rootDir, 'submodule');
  const gitDir = join(rootDir, '.git', 'modules', 'submodule');

  mkdirSync(cwd, { recursive: true });
  mkdirSync(gitDir, { recursive: true });
  writeFileSync(join(cwd, '.git'), 'gitdir: ../.git/modules/submodule\n');

  return {
    rootDir,
    cwd,
    cleanup: () => {
      rmSync(rootDir, { recursive: true, force: true });
    },
  };
}
