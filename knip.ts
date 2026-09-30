import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: [
    'src/entries/bin.ts!',
    'src/entries/cli.ts!',
    'src/entries/index.ts!',
    'src/entries/opencode-v2.ts!',
    'src/entries/api.ts!',
    'src/gui/frontend/main.ts!',
    'scripts/build.ts!',
    'scripts/check-comments.ts!',
    'scripts/project-bun.ts!',
    'scripts/verify-coverage.ts!',
  ],
  project: ['src/**/*.ts!', 'scripts/**/*.ts!'],
  ignoreBinaries: ['gh', 'tsc'],
  ignoreDependencies: ['@opencode-ai/plugin'],
};

export default config;
