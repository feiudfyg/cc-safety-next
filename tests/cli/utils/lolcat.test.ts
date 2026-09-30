import { describe, expect, test } from 'bun:test';
import { writeAnimatedLolcat as portedWriteAnimated } from '@/cli/utils/lolcat';
import { createFakeOutput } from '../../helpers/fake-tty';

const TEXT = 'ab\ncd';
const BEGIN_SYNC = '\x1b[?2026h';
const END_SYNC = '\x1b[?2026l';

const ANSI_STYLE = new RegExp(`${'\x1b'}\\[[\\d;]*m`, 'g');
const plain = (frame: string) => frame.replace(ANSI_STYLE, '');

function captureAnimation(isTTY: boolean, signal?: AbortSignal, seed = 5) {
  const output = createFakeOutput({ isTTY });
  return portedWriteAnimated(TEXT, {
    output,
    seed,
    signal,
    sleep: async () => {},
  }).then(() => output.chunks);
}

describe('cli/utils/lolcat', () => {
  test('the settled frame paints one distinct colour per character, deterministically by seed', async () => {
    const settled = (await captureAnimation(true)).at(-4) ?? '';
    const colours = settled.match(new RegExp(`${'\x1b'}\\[38;2;\\d+;\\d+;\\d+m`, 'g')) ?? [];
    expect(colours).toHaveLength(TEXT.replace('\n', '').length);
    expect(new Set(colours).size).toBe(colours.length);
    expect(plain(settled)).toBe(`${BEGIN_SYNC}\x1b8ab\x1b8\x1b[1Bcd${END_SYNC}`);
    expect((await captureAnimation(true)).at(-4)).toBe(settled);
    expect((await captureAnimation(true, undefined, 6)).at(-4)).not.toBe(settled);
  });

  test('writeAnimatedLolcat writes the same frames to a TTY on both implementations', async () => {
    const ported = await captureAnimation(true);
    expect(ported[0]).toBe('\x1b[?25l\n\x1b[1A\x1b7');
    expect(ported.slice(-3)).toEqual(['\x1b8', '\x1b[1B', '\n\x1b[0m\x1b[?25h']);
    expect(ported).toHaveLength(41);
    for (const frame of ported.slice(1, -3)) {
      expect(frame, frame).toStartWith(BEGIN_SYNC);
      expect(frame, frame).toEndWith(END_SYNC);
    }
  });

  test('an aborted signal stops both implementations before the first frame', async () => {
    const ported = await captureAnimation(true, AbortSignal.abort());
    expect(ported).toHaveLength(5);
    expect(plain(ported[1] ?? '')).toBe(`${BEGIN_SYNC}\x1b8ab\x1b8\x1b[1Bcd${END_SYNC}`);
    expect(ported.at(-1)).toBe('\n\x1b[0m\x1b[?25h');
  });

  test('a non-TTY sink receives the same bytes as a TTY on both implementations', async () => {
    const ported = await captureAnimation(false);
    expect(ported).toEqual(await captureAnimation(true));
  });
});
