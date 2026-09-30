import { afterEach, describe, expect, test } from 'bun:test';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createProcessEnvironment } from '@/core/environment';
import { detect } from '@/hosts/opencode/detect';

const roots: string[] = [];

function createRoot(): string {
  const root = mkdtempSync(join(tmpdir(), 'ccsn-detect-'));
  roots.push(root);
  return root;
}

function writeConfig(home: string, plugin: unknown): string {
  const configDir = join(home, '.config', 'opencode');
  mkdirSync(configDir, { recursive: true });
  const configPath = join(configDir, 'opencode.json');
  writeFileSync(configPath, JSON.stringify({ plugin }, null, 2));
  return configPath;
}

function writePackage(directory: string, name: string): void {
  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, 'package.json'), JSON.stringify({ name }));
}

function contextFor(home: string) {
  const base = createProcessEnvironment();
  const env = new Map(
    [...base.env].filter(([name]) => name !== 'XDG_CONFIG_HOME' && name !== 'OPENCODE_CONFIG_DIR'),
  );
  return { environment: { ...base, home, env }, cwd: home, openCodeVersion: null };
}

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe('OpenCode plugin detection', () => {
  test('recognizes the published package spec', () => {
    const home = createRoot();
    writeConfig(home, ['cc-safety-net@latest']);

    const detection = detect(contextFor(home));

    expect(detection.status).toBe('configured');
    expect(detection.method).toBe('plugin array');
  });

  test('recognizes a local path whose package is this fork', () => {
    const home = createRoot();
    const pluginDir = join(home, 'cc-safety-next');
    writePackage(pluginDir, '@local/cc-safety-net');
    writeConfig(home, [pluginDir]);

    const detection = detect(contextFor(home));

    expect(detection.status).toBe('configured');
  });

  test('ignores a local path whose package is something else', () => {
    const home = createRoot();
    const pluginDir = join(home, 'dcp-next');
    writePackage(pluginDir, '@local/opencode-dcp');
    writeConfig(home, [pluginDir]);

    expect(detect(contextFor(home)).status).toBe('n/a');
  });

  test('reports nothing when no config names the plugin', () => {
    const home = createRoot();
    writeConfig(home, ['some-other-plugin']);

    expect(detect(contextFor(home)).status).toBe('n/a');
  });
});
