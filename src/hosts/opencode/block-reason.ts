import type { IntegrationDenial } from '@/core/denial';
import { DESTRUCTIVE_COMMAND_RULE_METADATA } from '@/core/rules/destructive';
import { SECRET_PROTECTION_RULE_METADATA } from '@/core/rules/secret';
import { REASON_GIT_METADATA_PROTECTION } from '@/gate/guards/git-metadata-protection';
import { REASON_POLICY_APPLY_PROTECTION } from '@/gate/guards/policy-apply-protection';
import { REASON_POLICY_CONFIG_PROTECTION } from '@/gate/guards/policy-protection';
import { REASON_SECRET_PROTECTION } from '@/gate/secret/secret-protection';

const DESTRUCTIVE_REASONS = new Map(
  DESTRUCTIVE_COMMAND_RULE_METADATA.map((rule) => [rule.id, rule.description]),
);

const SECRET_REASONS = new Map(
  SECRET_PROTECTION_RULE_METADATA.map((rule) => [
    rule.id,
    'description' in rule
      ? rule.description
      : `Blocks access to the ${rule.label} credential file.`,
  ]),
);

export function describeBlockReason(denial: IntegrationDenial): string {
  if (denial.ruleId) {
    const destructive = DESTRUCTIVE_REASONS.get(denial.ruleId);
    if (destructive) return destructive;
    const secret = SECRET_REASONS.get(denial.ruleId);
    if (secret) return secret;
    if (denial.ruleId === 'secret.deny-path') {
      return 'This path is on the secret deny list in your policy.';
    }
  }
  if (denial.reason === REASON_POLICY_CONFIG_PROTECTION) {
    return 'This command would change the CC Safety Net policy files, which are protected.';
  }
  if (denial.reason === REASON_GIT_METADATA_PROTECTION) {
    return 'This command would edit the .git directory or Git hooks, which are protected.';
  }
  if (denial.reason === REASON_POLICY_APPLY_PROTECTION) return REASON_POLICY_APPLY_PROTECTION;
  if (denial.reason === REASON_SECRET_PROTECTION) {
    return 'This command would access a protected credential file.';
  }
  if (denial.unverifiedByStandardMode) {
    return 'This command could not be verified safely at the current safety level.';
  }
  if (denial.configWarning) return `The policy is invalid: ${denial.configWarning}`;
  return denial.reason;
}
