import { readFileSync } from 'node:fs';
import { delimiter, dirname, join } from 'node:path';

const pathKey = Object.keys(process.env).find((key) => key.toLowerCase() === 'path') ?? 'PATH';
const pinnedVersion = readFileSync(join(import.meta.dir, '..', '.bun-version'), 'utf8').trim();
const result = Bun.spawnSync(
  Bun.version === pinnedVersion
    ? [process.execPath, ...process.argv.slice(2)]
    : [process.execPath, 'x', '--package', `bun@${pinnedVersion}`, 'bun', ...process.argv.slice(2)],
  {
    env: {
      ...process.env,
      [pathKey]: `${dirname(process.execPath)}${delimiter}${process.env[pathKey] ?? ''}`,
    },
    stdin: 'inherit',
    stdout: 'inherit',
    stderr: 'inherit',
  },
);
process.exit(result.exitCode);
