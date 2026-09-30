import { afterEach, describe, expect, test } from 'bun:test';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createProcessEnvironment } from '@/core/environment';
import { DEFAULT_BLOCK_PROMPTS, loadBlockPrompts } from '@/core/prompts/block';
import { loadPrompt, promptFilePath } from '@/core/prompts/store';
import { getPluginTempDir, getPromptsDir, loadPluginSettings } from '@/core/settings';

const roots: string[] = [];

function createRoot(): string {
  const root = mkdtempSync(join(tmpdir(), 'ccsn-prompts-'));
  roots.push(root);
  return root;
}

function environmentFor(home: string, extra: Record<string, string> = {}) {
  const base = createProcessEnvironment();
  const env = new Map(
    [...base.env].filter(
      ([name]) =>
        name !== 'CC_SAFETY_NET_HOME' &&
        name !== 'CC_SAFETY_NET_NO_PROMPT_SEED' &&
        name !== 'XDG_CONFIG_HOME' &&
        name !== 'OPENCODE_CONFIG_DIR',
    ),
  );
  for (const [name, value] of Object.entries(extra)) env.set(name, value);
  return { ...base, home, env };
}

function writeSettings(home: string, settings: unknown): void {
  const dir = join(home, '.cc-safety-net');
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'settings.json'), JSON.stringify(settings));
}

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe('plugin settings', () => {
  test('falls back to the OS temp dir when nothing is configured', () => {
    const home = createRoot();
    const environment = environmentFor(home);
    expect(loadPluginSettings(environment)).toStrictEqual({});
    expect(getPluginTempDir(environment)).toBe(environment.tmpdir);
    expect(getPromptsDir(environment)).toBe(join(home, '.cc-safety-net', 'prompts'));
  });

  test('reads a configured temp dir, expanding a leading tilde', () => {
    const home = createRoot();
    writeSettings(home, { temp_dir: '~/scratch' });
    const environment = environmentFor(home);
    expect(getPluginTempDir(environment)).toBe(join(home, 'scratch'));
  });

  test('resolves a relative prompts dir against the config folder', () => {
    const home = createRoot();
    writeSettings(home, { prompts_dir: 'prompts-custom' });
    expect(getPromptsDir(environmentFor(home))).toBe(
      join(home, '.cc-safety-net', 'prompts-custom'),
    );
  });

  test('ignores a malformed settings file', () => {
    const home = createRoot();
    const dir = join(home, '.cc-safety-net');
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'settings.json'), '{ not json');
    const environment = environmentFor(home);
    expect(loadPluginSettings(environment)).toStrictEqual({});
    expect(getPluginTempDir(environment)).toBe(environment.tmpdir);
  });
});

describe('prompt files', () => {
  test('seeds a missing file with the default and returns it', () => {
    const home = createRoot();
    const environment = environmentFor(home);
    expect(loadPrompt(environment, 'blocked-header', 'DEFAULT')).toBe('DEFAULT');
    expect(readFileSync(promptFilePath(environment, 'blocked-header'), 'utf-8')).toBe('DEFAULT\n');
  });

  test('reads an edited file over the default', () => {
    const home = createRoot();
    const environment = environmentFor(home);
    const dir = getPromptsDir(environment);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'blocked-header.md'), 'CUSTOM\n');
    expect(loadPrompt(environment, 'blocked-header', 'DEFAULT')).toBe('CUSTOM');
  });

  test('keeps the default when seeding is disabled and the file is missing', () => {
    const home = createRoot();
    const environment = environmentFor(home, { CC_SAFETY_NET_NO_PROMPT_SEED: '1' });
    expect(loadPrompt(environment, 'blocked-header', 'DEFAULT')).toBe('DEFAULT');
    expect(existsSync(promptFilePath(environment, 'blocked-header'))).toBe(false);
  });

  test('loads only the overridden block prompts and defaults the rest', () => {
    const home = createRoot();
    const environment = environmentFor(home);
    const dir = getPromptsDir(environment);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'footer-hard-stop.md'), 'CUSTOM FOOTER\n');

    const prompts = loadBlockPrompts(environment);

    expect(prompts.footers.hard_stop).toBe('CUSTOM FOOTER');
    expect(prompts.footers.manual_only).toBe(DEFAULT_BLOCK_PROMPTS.footers.manual_only);
    expect(prompts.blockedHeader).toBe(DEFAULT_BLOCK_PROMPTS.blockedHeader);
  });
});
