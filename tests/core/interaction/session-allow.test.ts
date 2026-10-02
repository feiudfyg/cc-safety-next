import { describe, expect, test } from 'bun:test';
import { createSessionAllow, interactionIdentity } from '@/core/interaction/session-allow';

describe('session allow memory', () => {
  test('remembers an identity only within the session that allowed it', () => {
    const allow = createSessionAllow();
    const identity = interactionIdentity({
      ruleId: 'r1',
      reason: 'blocked',
      command: 'rm -rf /',
    });

    expect(allow.isAllowed('s1', identity)).toBe(false);
    allow.allow('s1', identity);

    expect(allow.isAllowed('s1', identity)).toBe(true);
    expect(allow.isAllowed('s2', identity)).toBe(false);
    expect(allow.isAllowed('s1', 'other')).toBe(false);
  });

  test('prefers the rule id and falls back to the reason', () => {
    expect(interactionIdentity({ ruleId: 'r1', reason: 'reason', command: 'cmd' })).toBe(
      'r1\u0000cmd',
    );
    expect(interactionIdentity({ reason: 'reason', command: 'cmd' })).toBe('reason\u0000cmd');
    expect(interactionIdentity({ reason: 'reason' })).toBe('reason\u0000');
  });
});
