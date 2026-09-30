import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Environment } from '@/core/environment';
import { getPromptsDir } from '@/core/settings';

const DISABLE_SEED_ENV = 'CC_SAFETY_NET_NO_PROMPT_SEED';

/** @internal */
export function promptFilePath(environment: Environment, name: string): string {
  return join(getPromptsDir(environment), `${name}.md`);
}

export function loadPrompt(environment: Environment, name: string, defaultText: string): string {
  const path = promptFilePath(environment, name);
  try {
    if (!existsSync(path)) {
      if (!environment.env.has(DISABLE_SEED_ENV)) {
        mkdirSync(getPromptsDir(environment), { recursive: true });
        writeFileSync(path, `${defaultText}\n`, 'utf-8');
      }
      return defaultText;
    }
    const text = readFileSync(path, 'utf-8').trim();
    return text === '' ? defaultText : text;
  } catch {
    return defaultText;
  }
}
