import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { GateVerdict } from './gate-differential';

const TABLE_FILE = join(import.meta.dir, '..', 'fixtures', 'gate', 'harvested-verdicts.jsonl');

export type HarvestedRow = Readonly<Record<string, string>> & { readonly literal: string };

export function harvestedVerdictCell(verdict: GateVerdict): string {
  if (verdict.outcome === 'allow') return 'allow';
  return [
    verdict.thrown === undefined ? verdict.outcome : 'fail-closed',
    verdict.ruleId,
    `@${String(verdict.stage)}`,
    verdict.ruleId === undefined ? verdict.reason : undefined,
  ]
    .filter((part): part is string => part !== undefined)
    .join(' ');
}

export function loadHarvestedVerdicts(): readonly HarvestedRow[] {
  return readFileSync(TABLE_FILE, 'utf8')
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => JSON.parse(line) as HarvestedRow);
}
