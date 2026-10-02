import { describe, expect, test } from 'bun:test';
import type { IntegrationDenial } from '@/core/denial';
import { classifyDanger, dangerLabel, dangerToastVariant } from '@/core/interaction/danger';

const denial = (overrides: Partial<IntegrationDenial> = {}): IntegrationDenial => ({
  reason: 'blocked',
  intent: 'manual_only',
  ...overrides,
});

describe('interaction danger', () => {
  test('maps hard stops and failed closes to high', () => {
    expect(classifyDanger(denial({ intent: 'hard_stop' }))).toBe('high');
    expect(classifyDanger(denial({ intent: 'stop_and_explain' }))).toBe('high');
  });

  test('maps manual-only to medium and alternatives to low', () => {
    expect(classifyDanger(denial({ intent: 'manual_only' }))).toBe('medium');
    expect(classifyDanger(denial({ intent: 'use_alternative' }))).toBe('low');
    expect(classifyDanger(denial({ intent: 'scope_down' }))).toBe('low');
  });

  test('escalates config warnings and standard-mode unverified blocks', () => {
    expect(classifyDanger(denial({ intent: 'use_alternative', configWarning: 'bad' }))).toBe(
      'high',
    );
    expect(
      classifyDanger(denial({ intent: 'use_alternative', unverifiedByStandardMode: true })),
    ).toBe('medium');
  });

  test('falls back to medium without an intent', () => {
    expect(classifyDanger({ reason: 'blocked' })).toBe('medium');
  });

  test('labels and toast variants follow the level', () => {
    expect(dangerLabel('high')).toBe('高危');
    expect(dangerLabel('medium')).toBe('警告');
    expect(dangerLabel('low')).toBe('提示');
    expect(dangerToastVariant('high')).toBe('error');
    expect(dangerToastVariant('medium')).toBe('warning');
    expect(dangerToastVariant('low')).toBe('info');
  });
});
