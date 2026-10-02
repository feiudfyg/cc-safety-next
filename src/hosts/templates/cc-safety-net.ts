import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const skillPath = join(import.meta.dir, '..', '..', '..', 'skills', 'cc-safety-net', 'SKILL.md');
const skill = existsSync(skillPath) ? readFileSync(skillPath, 'utf-8').replace(/\r\n/g, '\n') : '';
const headingIndex = skill.indexOf('# CC Safety Net');

export const CC_SAFETY_NET_TEMPLATE = `\n${headingIndex === -1 ? skill : skill.slice(headingIndex)}`;
