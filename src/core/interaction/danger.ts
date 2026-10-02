import type { BlockIntent } from '@/core/decision';
import type { IntegrationDenial } from '@/core/denial';

/** @internal */
export const DANGER_LEVELS = Object.freeze(['high', 'medium', 'low'] as const);

export type DangerLevel = (typeof DANGER_LEVELS)[number];

const INTENT_DANGER: Record<BlockIntent, DangerLevel> = {
  hard_stop: 'high',
  stop_and_explain: 'high',
  manual_only: 'medium',
  use_alternative: 'low',
  scope_down: 'low',
};

export function classifyDanger(denial: IntegrationDenial): DangerLevel {
  if (denial.configWarning !== undefined) return 'high';
  if (denial.unverifiedByStandardMode) return 'medium';
  return INTENT_DANGER[denial.intent ?? 'manual_only'];
}

export function dangerLabel(level: DangerLevel): string {
  if (level === 'high') return '高危';
  if (level === 'medium') return '警告';
  return '提示';
}

export function dangerToastVariant(level: DangerLevel): 'info' | 'success' | 'warning' | 'error' {
  if (level === 'high') return 'error';
  if (level === 'medium') return 'warning';
  return 'info';
}
