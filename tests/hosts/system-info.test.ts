import { afterEach, describe, expect, test } from 'bun:test';
import { join } from 'node:path';
import {
  defaultVersionFetcher,
  getPackageVersion,
  getSpawnCommand,
  getSystemInfo,
} from '@/hosts/system-info';
import { createFakeBin, type FakeScriptEntry } from '../helpers/fake-bin';
import { writeTree } from '../helpers/fixture-tree';
import { createTempRoot, removeTempRoots, withProcessEnv } from '../helpers/temp-home';

const ANSI_VERSION = `\u001b[32mv2.0.0\u001b[0m\n`;

const SCRIPT: readonly FakeScriptEntry[] = [
  { command: 'ver', args: ['--version'], stdout: 'v1.2.3\n' },
  { command: 'painted', args: ['--version'], stdout: ANSI_VERSION },
  { command: 'noisy', args: ['--version'], stderr: 'v3.0.0\n' },
  { command: 'broken', args: ['--version'], stdout: 'v9.9.9\n', exit: 1 },
  { command: 'stalled', args: ['--version'], delayMs: 2000 },
];

afterEach(removeTempRoots);

describe('the Windows-safe argv', () => {
  test('hands a shim to COMSPEC and spawns everything else directly', () => {
    const dir = createTempRoot('next-spawn-');
    writeTree(dir, { 'tool.CMD': '', 'other.EXE': '' });
    const windows = {
      _CC_SAFETY_NET_TEST_SPAWN_PLATFORM: 'win32',
      PATH: dir,
      PATHEXT: '.EXE;.CMD',
    };
    const cases: readonly { args: string[]; env: NodeJS.ProcessEnv }[] = [
      { args: ['tool', 'a b', 'c'], env: {} },
      { args: [], env: {} },
      { args: ['tool', 'a b', 'c'], env: windows },
      { args: ['tool'], env: { ...windows, COMSPEC: 'D:\\Windows\\System32\\cmd.exe' } },
      { args: ['other', 'x'], env: windows },
      { args: [join(dir, 'tool'), 'x'], env: windows },
      { args: ['tool.CMD', 'x'], env: windows },
      { args: ['ghost', 'x'], env: windows },
    ];
    const resolved = (spawnCommand: typeof getSpawnCommand) =>
      cases.map((testCase) => spawnCommand(testCase.args, testCase.env));

    expect(resolved(getSpawnCommand)).toEqual([
      { cmd: 'tool', args: ['a b', 'c'] },
      { cmd: '', args: [] },
      { cmd: 'cmd.exe', args: ['/d', '/c', `call ${join(dir, 'tool.CMD')} "a b" c`] },
      {
        cmd: 'D:\\Windows\\System32\\cmd.exe',
        args: ['/d', '/c', `call ${join(dir, 'tool.CMD')}`],
      },
      { cmd: join(dir, 'other.EXE'), args: ['x'] },
      { cmd: 'cmd.exe', args: ['/d', '/c', `call ${join(dir, 'tool.CMD')} x`] },
      { cmd: 'cmd.exe', args: ['/d', '/c', `call ${join(dir, 'tool.CMD')} x`] },
      { cmd: 'ghost', args: ['x'] },
    ]);
  });
});

describe('the default version probe', () => {
  test('reads a clean exit only, and strips whatever painted it', async () => {
    const bin = createFakeBin(join(createTempRoot('next-version-'), 'fake'), SCRIPT);
    const probe = async (fetcher: typeof defaultVersionFetcher) => [
      await fetcher(['ver', '--version']),
      await fetcher(['painted', '--version']),
      await fetcher(['noisy', '--version']),
      await fetcher(['broken', '--version']),
      await fetcher([]),
      await fetcher(['stalled', '--version'], 200),
    ];
    const ported = await withProcessEnv(bin.env, () => probe(defaultVersionFetcher));
    expect(ported).toEqual(['v1.2.3', 'v2.0.0', 'v3.0.0', null, null, null]);
  });
});

describe('the system report', () => {
  test.each([
    [
      '2.0.19 with a cc-safety-net entry',
      '2.0.19',
      true,
      [
        {
          args: [
            'opencode',
            'api',
            'integration.list',
            '--param',
            'location[directory]=/work/project',
          ],
          timeoutMs: 30_000,
        },
        {
          args: ['opencode', 'api', 'plugin.list', '--param', 'location[directory]=/work/project'],
          timeoutMs: 30_000,
        },
      ],
      'plugin inventory',
    ],
    ['2.0.19 without a cc-safety-net entry', '2.0.19', false, [], null],
    ['1.18.33 with a cc-safety-net entry', '1.18.33', true, [], null],
  ])(
    'asks OpenCode %s for its plugin inventory only on v2 with the entry',
    async (_case, version, hasEntry, apiCalls, output) => {
      const calls: { args: string[]; timeoutMs: number | undefined }[] = [];
      const entryChecks: string[] = [];
      const info = await getSystemInfo(
        (openCodeVersion) => {
          entryChecks.push(openCodeVersion);
          return hasEntry;
        },
        async (args, timeoutMs) => {
          calls.push({ args, timeoutMs });
          if (args.join(' ') === 'opencode --version') return version;
          return args[2] === 'plugin.list' ? 'plugin inventory' : null;
        },
        '/work/project',
      );
      expect(entryChecks).toEqual(version.startsWith('2.') ? [version] : []);
      expect(calls.filter((call) => call.args[0] === 'opencode' && call.args[1] === 'api')).toEqual(
        apiCalls,
      );
      expect(info.openCodePluginListOutput).toBe(output);
    },
  );

  test('reports the build-time package version', () => {
    expect(getPackageVersion()).toBe('dev');
  });
});
