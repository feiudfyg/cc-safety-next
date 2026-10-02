export type CdTarget =
  | { readonly kind: 'directory'; readonly target: string }
  | { readonly kind: 'home' }
  | { readonly kind: 'previous' }
  | { readonly kind: 'uncertain' };

const CD_OPTION = /^-[LP]+$/;

export function parseCdTarget(args: readonly string[]): CdTarget {
  const optionEnd = args.findIndex(
    (token) => token.length <= 1 || !token.startsWith('-') || token === '--',
  );
  const options = optionEnd === -1 ? args : args.slice(0, optionEnd);
  if (options.some((token) => !CD_OPTION.test(token))) return { kind: 'uncertain' };
  const rest = optionEnd === -1 ? [] : args.slice(optionEnd);
  const targets = rest[0] === '--' ? rest.slice(1) : rest;
  if (targets.length === 0) return { kind: 'home' };
  if (targets.length > 1) return { kind: 'uncertain' };
  const target = targets[0] ?? '';
  if (target === '-') return { kind: 'previous' };
  if (target === '') return { kind: 'uncertain' };
  return { kind: 'directory', target };
}
