import type { Plugin } from '@opencode/plugin/effect/plugin';
import { createOpenCodeV2Plugin } from '@/hosts/opencode/v2';

const plugin: Plugin = createOpenCodeV2Plugin();
export default plugin;
