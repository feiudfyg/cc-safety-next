import { afterEach, describe, expect, test } from 'bun:test';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { Plugin as OpenCodePlugin } from '@opencode/plugin';
import { createOpenCodePlugin } from '@/hosts/opencode/server';

const roots: string[] = [];

type ToolBefore = (event: {
  tool: string;
  sessionID: string;
  input: unknown;
}) => Promise<void> | void;
type ShellBefore = (event: { shell: string }) => void;
type CommandDefinition = {
  name: string;
  description?: string;
  execute: (input: unknown) => Promise<void>;
};

function createFakeContext(directory: string) {
  let toolBefore: ToolBefore | undefined;
  let shellBefore: ShellBefore | undefined;
  const commands: CommandDefinition[] = [];
  const context = {
    options: { shell: 'posix' },
    location: { directory },
    tool: {
      hook: (_name: string, callback: ToolBefore) => {
        toolBefore = callback;
        return Promise.resolve({ dispose: () => Promise.resolve() });
      },
    },
    shell: {
      hook: (_name: string, callback: ShellBefore) => {
        shellBefore = callback;
        return Promise.resolve({ dispose: () => Promise.resolve() });
      },
    },
    command: {
      list: () => Promise.resolve({ location: {}, data: [] }),
      transform: (callback: (editor: { add: (definition: CommandDefinition) => void }) => void) => {
        callback({ add: (definition) => commands.push(definition) });
        return Promise.resolve({ dispose: () => Promise.resolve() });
      },
      reload: () => Promise.resolve(),
    },
    session: { prompt: () => Promise.resolve({}) },
  } as unknown as OpenCodePlugin.Context;
  return {
    context,
    toolBefore: () => toolBefore,
    shellBefore: () => shellBefore,
    commands,
  };
}

function createRoot(): string {
  const root = mkdtempSync(join(tmpdir(), 'ccsn-server-'));
  roots.push(root);
  return root;
}

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe('OpenCode v2 server plugin', () => {
  test('registers the shell tool hook that blocks a destructive command', async () => {
    const fake = createFakeContext(createRoot());
    await createOpenCodePlugin().setup(fake.context);
    const hook = fake.toolBefore();
    if (!hook) throw new Error('execute.before was not registered');

    await expect(
      hook({ tool: 'shell', sessionID: 's1', input: { command: 'rm -rf /' } }),
    ).rejects.toThrow();
    await expect(
      hook({ tool: 'shell', sessionID: 's1', input: { command: 'ls' } }),
    ).resolves.toBeUndefined();
  });

  test('fails closed for an unrecognized tool name', async () => {
    const fake = createFakeContext(createRoot());
    await createOpenCodePlugin().setup(fake.context);
    const hook = fake.toolBefore();
    if (!hook) throw new Error('execute.before was not registered');

    await expect(hook({ tool: '', sessionID: 's1', input: undefined })).rejects.toThrow();
  });

  test('rejects a shell that disagrees with the plugin option', async () => {
    const fake = createFakeContext(createRoot());
    await createOpenCodePlugin().setup(fake.context);
    const hook = fake.shellBefore();
    if (!hook) throw new Error('create.before was not registered');

    expect(() => hook({ shell: 'cmd.exe' })).toThrow();
    expect(() => hook({ shell: '/bin/bash' })).not.toThrow();
  });

  test('registers the built-in command when it is absent', async () => {
    const fake = createFakeContext(createRoot());
    await createOpenCodePlugin().setup(fake.context);

    expect(fake.commands.map((command) => command.name)).toEqual(['cc-safety-net']);
    expect(fake.commands[0]?.description).toContain('CC Safety Net');
  });
});
