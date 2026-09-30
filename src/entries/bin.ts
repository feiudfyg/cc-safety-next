#!/usr/bin/env node

async function main(): Promise<void> {
  const cli = await import('@/cli/main');
  await cli.runCli(process.argv.slice(2));
}

main().catch((error: unknown) => {
  console.error('CC Safety Net error:', error);
  process.exit(1);
});
