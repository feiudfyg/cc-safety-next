import { describe, expect, test } from 'bun:test';
import {
  formatCoverageSummary,
  parseCoverageSummary,
  verifyCoverageFile,
  verifyCoverageSummary,
} from '../../scripts/verify-coverage';

const EXACT_NINETY = [
  'TN:',
  'SF:src/a.ts',
  'FNF:10',
  'FNH:9',
  'LF:20',
  'LH:18',
  'end_of_record',
  '',
].join('\n');

describe('coverage verification', () => {
  test('accepts exactly 90 percent for both global metrics', () => {
    const summary = parseCoverageSummary(EXACT_NINETY);
    expect(verifyCoverageSummary(summary)).toEqual(summary);
    expect(formatCoverageSummary(summary)).toBe(
      'Coverage verified: lines 90.00% (18/20), functions 90.00% (9/10), minimum 90.00%.',
    );
  });

  test('aggregates valid complete records while preserving standard detail fields', () => {
    expect(
      parseCoverageSummary(
        [
          'TN:first',
          'SF:src/a.ts',
          'FN:1,one',
          'FNDA:1,one',
          'DA:1,1',
          'BRDA:1,0,0,1',
          'FNF:5',
          'FNH:5',
          'LF:10',
          'LH:10',
          'end_of_record',
          'TN:second',
          'SF:src/b.ts',
          'FNF:5',
          'FNH:4',
          'LF:10',
          'LH:8',
          'end_of_record',
        ].join('\n'),
      ),
    ).toEqual({ lines: { hit: 18, total: 20 }, functions: { hit: 9, total: 10 } });
  });

  test.each([
    ['lines', ['SF:src/a.ts', 'FNF:10', 'FNH:9', 'LF:20', 'LH:17', 'end_of_record'].join('\n')],
    ['functions', ['SF:src/a.ts', 'FNF:10', 'FNH:8', 'LF:20', 'LH:18', 'end_of_record'].join('\n')],
  ])('rejects %s coverage below 90 percent', (metric, lcov) => {
    expect(() => verifyCoverageSummary(parseCoverageSummary(lcov))).toThrow(
      `Coverage below 90.00%: ${metric}`,
    );
  });

  test('rejects a report whose metric totals are zero', () => {
    const summary = parseCoverageSummary(
      ['SF:src/a.ts', 'FNF:0', 'FNH:0', 'LF:0', 'LH:0', 'end_of_record'].join('\n'),
    );
    expect(summary).toEqual({ lines: { hit: 0, total: 0 }, functions: { hit: 0, total: 0 } });
    expect(() => verifyCoverageSummary(summary)).toThrow(
      'Coverage report has no measurable lines, functions',
    );
  });

  test('rejects a malformed metric value instead of passing on NaN', () => {
    expect(() =>
      verifyCoverageSummary(
        parseCoverageSummary(
          ['SF:src/a.ts', 'FNF:x', 'FNH:9', 'LF:20', 'LH:18', 'end_of_record'].join('\n'),
        ),
      ),
    ).toThrow('Malformed LCOV FNF value');
  });

  test('rejects an empty report', () => {
    expect(() => parseCoverageSummary('')).toThrow('LCOV report is empty');
  });

  test('rejects a missing LCOV report', () => {
    expect(() => verifyCoverageFile('missing-coverage/lcov.info')).toThrow(
      'Coverage report is missing: missing-coverage/lcov.info',
    );
  });
});
