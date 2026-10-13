import { afterEach, describe, expect, test } from 'bun:test';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createTestEnvironment, type Environment } from '@/core/environment';
import {
  clearInteraction,
  type InteractionDecision,
  listInteractionRequests,
  readInteractionResponse,
  writeInteractionRequest,
} from '@/core/interaction/protocol';
import { createTuiController, formatBlockedCall, type TuiUi } from '@/hosts/opencode/tui';

const roots: string[] = [];

function createEnvironment(): Environment {
  const root = mkdtempSync(join(tmpdir(), 'ccsn-tui-'));
  roots.push(root);
  return createTestEnvironment({ tmpdir: root });
}

function seedRequest(environment: Environment, id: string, createdAt = Date.now()): void {
  writeInteractionRequest(environment, {
    id,
    sessionID: 's1',
    reason: 'git checkout would discard local changes',
    createdAt,
  });
}

type SelectProps = {
  title: string;
  placeholder?: string;
  options: { title: string; value: InteractionDecision }[];
};

function createFakeApi() {
  let resolveSelect: ((value: InteractionDecision | undefined) => void) | undefined;
  let lastProps: SelectProps | undefined;
  let clearCount = 0;
  let selectCount = 0;
  const api = {
    ui: {
      dialog: {
        select: (props: SelectProps) => {
          selectCount += 1;
          lastProps = props;
          return new Promise((resolve) => {
            resolveSelect = resolve;
          });
        },
        clear: () => {
          clearCount += 1;
        },
      },
    },
  } as unknown as { ui: TuiUi };
  return {
    api,
    select: (value: InteractionDecision) => resolveSelect?.(value),
    dismiss: () => resolveSelect?.(undefined),
    clearCount: () => clearCount,
    selectCount: () => selectCount,
    lastProps: () => lastProps,
  };
}

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe('OpenCode interaction TUI', () => {
  test('rejects when the dialog is dismissed with escape', async () => {
    const environment = createEnvironment();
    seedRequest(environment, 'a');
    const fake = createFakeApi();
    const controller = createTuiController(fake.api, environment, 1_000_000);

    fake.dismiss();
    await flush();

    expect(readInteractionResponse(environment, 'a')).toBe('reject');
    controller.dispose();
  });

  test('returns the decision chosen from the dialog', async () => {
    const environment = createEnvironment();
    seedRequest(environment, 'a');
    const fake = createFakeApi();
    const controller = createTuiController(fake.api, environment, 1_000_000);

    fake.select('once');
    await flush();

    expect(readInteractionResponse(environment, 'a')).toBe('once');
    controller.dispose();
  });

  test('shows the detailed reason and the shortened call above the options', () => {
    const environment = createEnvironment();
    writeInteractionRequest(environment, {
      id: 'a',
      sessionID: 's1',
      reason: 'git checkout force would discard local changes',
      createdAt: Date.now(),
      toolName: 'bash',
      command: `git checkout --force ${'x'.repeat(300)}`,
    });
    const fake = createFakeApi();
    const controller = createTuiController(fake.api, environment, 1_000_000);

    const props = fake.lastProps();
    expect(props?.title).toBe('git checkout force would discard local changes');
    expect(props?.placeholder).toStartWith('bash: git checkout --force ');
    expect(props?.placeholder?.endsWith('…')).toBeTrue();
    expect(props?.options.map((option) => option.title)).toEqual([
      'Allow once',
      'Allow for this session',
      'Reject',
    ]);
    controller.dispose();
  });

  test('does not reopen a dismissed dialog while the request is still present', async () => {
    const environment = createEnvironment();
    seedRequest(environment, 'a');
    const fake = createFakeApi();
    const controller = createTuiController(fake.api, environment, 1_000_000);

    fake.dismiss();
    await flush();
    controller.tick();

    expect(fake.selectCount()).toBe(1);
    controller.dispose();
  });

  test('clears the dialog once the request disappears', () => {
    const environment = createEnvironment();
    seedRequest(environment, 'a');
    const fake = createFakeApi();
    const controller = createTuiController(fake.api, environment, 1_000_000);
    expect(fake.clearCount()).toBe(0);

    clearInteraction(environment, 'a');
    controller.tick();

    expect(fake.clearCount()).toBe(1);
    controller.dispose();
  });

  test('prunes a stale request instead of asking', () => {
    const environment = createEnvironment();
    seedRequest(environment, 'old', Date.now() - 11 * 60 * 1000);
    const fake = createFakeApi();
    const controller = createTuiController(fake.api, environment, 1_000_000);

    expect(listInteractionRequests(environment)).toEqual([]);
    expect(fake.selectCount()).toBe(0);
    controller.dispose();
  });
});

describe('formatBlockedCall', () => {
  test('collapses whitespace, prefixes the tool, and truncates long commands', () => {
    expect(
      formatBlockedCall({
        id: 'a',
        sessionID: 's1',
        reason: 'r',
        createdAt: 0,
        command: 'git\n  checkout   --  ',
      }),
    ).toBe('git checkout --');

    const long = formatBlockedCall({
      id: 'a',
      sessionID: 's1',
      reason: 'r',
      createdAt: 0,
      toolName: 'bash',
      command: `git checkout ${'y'.repeat(300)}`,
    });
    expect(long).toStartWith('bash: git checkout ');
    expect(long.endsWith('…')).toBeTrue();
    expect(long.length).toBe('bash: '.length + 160);
  });

  test('falls back to the segment when no command is present', () => {
    expect(
      formatBlockedCall({
        id: 'a',
        sessionID: 's1',
        reason: 'r',
        createdAt: 0,
        segment: 'rm -rf /',
      }),
    ).toBe('rm -rf /');
  });
});
