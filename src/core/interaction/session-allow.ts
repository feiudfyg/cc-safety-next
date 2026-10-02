import type { IntegrationDenial } from '@/core/denial';

export type SessionAllow = {
  allow(sessionID: string, identity: string): void;
  isAllowed(sessionID: string, identity: string): boolean;
};

export function createSessionAllow(): SessionAllow {
  const allowed = new Map<string, Set<string>>();
  return {
    allow(sessionID, identity) {
      const identities = allowed.get(sessionID) ?? new Set<string>();
      identities.add(identity);
      allowed.set(sessionID, identities);
    },
    isAllowed(sessionID, identity) {
      return allowed.get(sessionID)?.has(identity) ?? false;
    },
  };
}

export function interactionIdentity(
  denial: Pick<IntegrationDenial, 'ruleId' | 'reason' | 'command'>,
): string {
  return `${denial.ruleId ?? denial.reason}\u0000${denial.command ?? ''}`;
}
