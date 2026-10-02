import { describe, expect, test } from 'bun:test';
import { parseCommandArgs } from '@/cli/args';

describe('parseCommandArgs', () => {
  test('reads an inline --flag=value assignment', () => {
    const parsed = parseCommandArgs({ label: 'explain', values: { cwd: ['--cwd'] } }, [
      '--cwd=/tmp/work',
    ]);

    expect(parsed.values.cwd).toBe('/tmp/work');
    expect(parsed.errors).toEqual([]);
  });

  test('reads an inline list assignment without stopping the sweep', () => {
    const parsed = parseCommandArgs({ label: 'rule', lists: { only: ['--only'] } }, [
      '--only=a',
      '--only=b',
    ]);

    expect(parsed.lists.only).toEqual(['a', 'b']);
    expect(parsed.errors).toEqual([]);
  });

  test('still reads a space-separated value', () => {
    const parsed = parseCommandArgs({ label: 'explain', values: { cwd: ['--cwd'] } }, [
      '--cwd',
      '/tmp/work',
    ]);

    expect(parsed.values.cwd).toBe('/tmp/work');
  });

  test('reports an inline assignment to an unknown option', () => {
    const parsed = parseCommandArgs({ label: 'explain', values: { cwd: ['--cwd'] } }, [
      '--nope=value',
    ]);

    expect(parsed.errors).toEqual(['Unknown option for explain: --nope=value']);
  });
});
