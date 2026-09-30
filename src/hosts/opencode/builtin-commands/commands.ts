import type { Environment } from '@/core/environment';
import { loadPrompt } from '@/core/prompts/store';
import { CC_SAFETY_NET_TEMPLATE } from '@/hosts/templates/cc-safety-net';
import type { BuiltinCommands } from './types';

const COMMAND_NAME = 'cc-safety-net';
const COMMAND_HEADING = '# CC Safety Net';
const COMMAND_DESCRIPTION =
  'Operate CC Safety Net: explain blocks, rules, integrations, diagnostics';

export function loadBuiltinCommands(environment?: Environment): BuiltinCommands {
  const template = environment
    ? loadPrompt(environment, 'command', CC_SAFETY_NET_TEMPLATE)
    : CC_SAFETY_NET_TEMPLATE;
  const description = environment
    ? loadPrompt(environment, 'command-description', COMMAND_DESCRIPTION)
    : COMMAND_DESCRIPTION;
  const headingIndex = template.indexOf(COMMAND_HEADING);
  return {
    [COMMAND_NAME]: {
      description,
      template: headingIndex >= 0 ? template.slice(headingIndex) : template,
    },
  };
}
