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
import { createTuiController, type TuiApi } from '@/hosts/opencode/tui';

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
    reason: 'blocked',
    danger: 'high',
    createdAt,
  });
}

function createFakeApi() {
  let onClose: (() => void) | undefined;
  let onSelect: ((option: { title: string; value: InteractionDecision }) => void) | undefined;
  let clearCount = 0;
  let replaceCount = 0;
  const api: TuiApi = {
    ui: {
      toast: () => {},
      dialog: {
        replace: (render, close) => {
          replaceCount += 1;
          onClose = close;
          render();
        },
        clear: () => {
          clearCount += 1;
          onClose = undefined;
        },
      },
      DialogSelect: (props) => {
        onSelect = props.onSelect;
        return props;
      },
    },
  };
  return {
    api,
    pressEscape: () => onClose?.(),
    select: (value: InteractionDecision) => onSelect?.({ title: '', value }),
    clearCount: () => clearCount,
    replaceCount: () => replaceCount,
  };
}

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe('OpenCode interaction TUI', () => {
  test('rejects when the dialog is dismissed with escape', () => {
    const environment = createEnvironment();
    seedRequest(environment, 'a');
    const fake = createFakeApi();
    const controller = createTuiController(fake.api, environment, 1_000_000);

    fake.pressEscape();

    expect(readInteractionResponse(environment, 'a')).toBe('reject');
    controller.dispose();
  });

  test('returns the decision chosen from the dialog', () => {
    const environment = createEnvironment();
    seedRequest(environment, 'a');
    const fake = createFakeApi();
    const controller = createTuiController(fake.api, environment, 1_000_000);

    fake.select('once');

    expect(readInteractionResponse(environment, 'a')).toBe('once');
    controller.dispose();
  });

  test('does not reopen a dismissed dialog while the request is still present', () => {
    const environment = createEnvironment();
    seedRequest(environment, 'a');
    const fake = createFakeApi();
    const controller = createTuiController(fake.api, environment, 1_000_000);

    fake.pressEscape();
    controller.tick();

    expect(fake.replaceCount()).toBe(1);
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
    expect(fake.replaceCount()).toBe(0);
    controller.dispose();
  });
});
