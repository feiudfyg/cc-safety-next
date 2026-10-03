import { describe, expect, test } from 'bun:test';
import type { IntegrationDenial } from '@/core/denial';
import { REASON_GIT_METADATA_PROTECTION } from '@/gate/guards/git-metadata-protection';
import { REASON_POLICY_APPLY_PROTECTION } from '@/gate/guards/policy-apply-protection';
import { REASON_POLICY_CONFIG_PROTECTION } from '@/gate/guards/policy-protection';
import { REASON_SECRET_PROTECTION } from '@/gate/secret/secret-protection';
import { describeBlockReason } from '@/hosts/opencode/block-reason';

function reason(denial: Partial<IntegrationDenial> & { reason: string }): string {
  return describeBlockReason(denial as IntegrationDenial);
}

describe('describeBlockReason', () => {
  test('uses the built-in destructive rule description for its rule id', () => {
    expect(reason({ reason: 'ignored', ruleId: 'git.checkout-force' })).toBe(
      'Blocks forced checkout operations that discard local changes.',
    );
    expect(reason({ reason: 'ignored', ruleId: 'rm.recursive-force-root-or-home' })).toBe(
      'Blocks recursive forced removal of root or home paths.',
    );
  });

  test('uses the built-in secret rule description for its rule id', () => {
    expect(reason({ reason: 'ignored', ruleId: 'secret.ext.asc' })).toBe(
      'Blocks files with the .asc extension.',
    );
    expect(reason({ reason: 'ignored', ruleId: 'secret.basename.id-rsa' })).toBe(
      'Blocks RSA private key basenames.',
    );
  });

  test('names the configured secret deny list', () => {
    expect(reason({ reason: REASON_SECRET_PROTECTION, ruleId: 'secret.deny-path' })).toBe(
      'This path is on the secret deny list in your policy.',
    );
  });

  test('describes the protected configuration, Git metadata and policy apply guards', () => {
    expect(reason({ reason: REASON_POLICY_CONFIG_PROTECTION })).toBe(
      'This command would change the CC Safety Net policy files, which are protected.',
    );
    expect(reason({ reason: REASON_GIT_METADATA_PROTECTION })).toBe(
      'This command would edit the .git directory or Git hooks, which are protected.',
    );
    expect(reason({ reason: REASON_POLICY_APPLY_PROTECTION })).toBe(REASON_POLICY_APPLY_PROTECTION);
  });

  test('falls back to the denial reason when no rule is known', () => {
    expect(reason({ reason: 'some structural limit' })).toBe('some structural limit');
    expect(reason({ reason: 'unverified', unverifiedByStandardMode: true })).toBe(
      'This command could not be verified safely at the current safety level.',
    );
  });
});
