type InstallMetadata = {
  order: number;
  flag: string;
  artifactKind: 'plugin' | 'extension' | 'hook config' | 'package';
  probeCommand: readonly [string, ...string[]];
};

type IntegrationCatalogEntry = {
  id: string;
  displayName: string;
  doctorOrder: number;
  install: InstallMetadata;
};

const catalog = [
  {
    id: 'opencode',
    displayName: 'OpenCode',
    doctorOrder: 1,
    install: {
      order: 1,
      flag: '--opencode',
      artifactKind: 'plugin',
      probeCommand: ['opencode', '--version'],
    },
  },
] as const satisfies readonly IntegrationCatalogEntry[];

export type IntegrationId = (typeof catalog)[number]['id'];

export const doctorIntegrationOrder = catalog
  .slice()
  .sort((a, b) => a.doctorOrder - b.doctorOrder)
  .map((integration) => integration.id);

export const installIntegrationMetadata = catalog
  .slice()
  .sort((a, b) => a.install.order - b.install.order)
  .map((integration) => ({ id: integration.id, ...integration.install }))
  .map(({ order: _, ...integration }) => integration);

export const integrationDisplayNames = Object.fromEntries(
  catalog.map((integration) => [integration.id, integration.displayName]),
) as Record<IntegrationId, string>;

export function getIntegrationDisplayName(id: IntegrationId): string {
  return integrationDisplayNames[id];
}
