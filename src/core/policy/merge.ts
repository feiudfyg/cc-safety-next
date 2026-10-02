import { SECRET_DEFAULT_OFF_RULE_ID_SET } from '@/core/rules/secret';
import {
  SAFETY_LEVEL_CAPABILITIES,
  SAFETY_OVERRIDE_KEYS,
  type SafetyLevelCapability,
} from './safety-level';
import type { DestructiveCommandRuleOverride, GuiPolicy, PolicySafetyLevel } from './types';

const LEVEL_RANK: Record<PolicySafetyLevel, number> = { standard: 0, strict: 1, paranoid: 2 };

export type ProjectPolicyProjection = {
  safety?: {
    level?: PolicySafetyLevel;
    overrides?: Partial<Record<SafetyLevelCapability, boolean>>;
  };
  workflow?: { worktree_mode?: boolean };
  destructive_command_protection?: {
    enabled?: boolean;
    overrides?: Record<string, DestructiveCommandRuleOverride>;
    allow_paths?: string[];
  };
  secret_protection?: {
    enabled?: boolean;
    overrides?: Record<string, DestructiveCommandRuleOverride>;
    deny_paths?: string[];
    allow_paths?: string[];
  };
};

export function mergeProjectPolicy(
  user: GuiPolicy,
  project: ProjectPolicyProjection,
): { policy: GuiPolicy; weakenings: readonly string[] } {
  const policy: GuiPolicy = {
    version: 1,
    safety: {
      level: stricterLevel(user.safety.level, project.safety?.level),
      overrides: {
        ...user.safety.overrides,
        ...enabledBooleanOverrides(project.safety?.overrides),
      },
    },
    workflow: {
      worktree_mode:
        project.workflow?.worktree_mode === false ? false : user.workflow.worktree_mode,
    },
    destructive_command_protection: {
      enabled:
        user.destructive_command_protection.enabled ||
        project.destructive_command_protection?.enabled === true,
      overrides: {
        ...user.destructive_command_protection.overrides,
        ...enabledRuleOverrides(project.destructive_command_protection?.overrides),
      },
      allow_paths: [...user.destructive_command_protection.allow_paths],
    },
    secret_protection: {
      enabled: user.secret_protection.enabled || project.secret_protection?.enabled === true,
      overrides: {
        ...user.secret_protection.overrides,
        ...enabledRuleOverrides(project.secret_protection?.overrides),
      },
      deny_paths: unionPaths(
        user.secret_protection.deny_paths,
        project.secret_protection?.deny_paths,
      ),
      allow_paths: [...user.secret_protection.allow_paths],
    },
    audit: user.audit,
  };
  return { policy, weakenings: collectWeakenings(user, project) };
}

function stricterLevel(
  user: PolicySafetyLevel,
  project: PolicySafetyLevel | undefined,
): PolicySafetyLevel {
  if (project === undefined) return user;
  return LEVEL_RANK[project] >= LEVEL_RANK[user] ? project : user;
}

function enabledBooleanOverrides(
  project: Partial<Record<SafetyLevelCapability, boolean>> | undefined,
): Partial<Record<SafetyLevelCapability, boolean>> {
  return Object.fromEntries(
    Object.entries(project ?? {}).filter(([, value]) => value === true),
  ) as Partial<Record<SafetyLevelCapability, boolean>>;
}

function enabledRuleOverrides(
  project: Record<string, DestructiveCommandRuleOverride> | undefined,
): Record<string, DestructiveCommandRuleOverride> {
  return Object.fromEntries(
    Object.entries(project ?? {}).filter(([, value]) => value === 'on'),
  ) as Record<string, DestructiveCommandRuleOverride>;
}

function unionPaths(user: readonly string[], project: readonly string[] | undefined): string[] {
  return [...new Set([...user, ...(project ?? [])])];
}

function collectWeakenings(user: GuiPolicy, project: ProjectPolicyProjection): string[] {
  const level = project.safety?.level;
  const capabilities = SAFETY_LEVEL_CAPABILITIES[user.safety.level];
  return [
    ...(level && LEVEL_RANK[level] < LEVEL_RANK[user.safety.level]
      ? [`project policy lowers level: ${user.safety.level} -> ${level}`]
      : []),
    ...SAFETY_OVERRIDE_KEYS.flatMap((key) =>
      project.safety?.overrides?.[key] === false &&
      (user.safety.overrides[key] ?? capabilities[key])
        ? [`project policy disables ${key}`]
        : [],
    ),
    ...(project.workflow?.worktree_mode === true && !user.workflow.worktree_mode
      ? ['project policy enables worktree mode relaxations']
      : []),
    ...(project.destructive_command_protection?.enabled === false &&
    user.destructive_command_protection.enabled
      ? ['project policy disables destructive command protection']
      : []),
    ...(project.secret_protection?.enabled === false && user.secret_protection.enabled
      ? ['project policy disables secret protection']
      : []),
    ...disabledRules(
      project.destructive_command_protection?.overrides,
      (id) =>
        user.destructive_command_protection.enabled &&
        user.destructive_command_protection.overrides[id] !== 'off',
    ),
    ...disabledRules(
      project.secret_protection?.overrides,
      (id) =>
        user.secret_protection.enabled &&
        (user.secret_protection.overrides[id] === 'on'
          ? true
          : user.secret_protection.overrides[id] !== 'off' &&
            !SECRET_DEFAULT_OFF_RULE_ID_SET.has(id)),
    ),

    ...(user.destructive_command_protection.enabled
      ? addedPaths(
          user.destructive_command_protection.allow_paths,
          project.destructive_command_protection?.allow_paths,
        ).map((path) => `project policy adds destructive allow path: ${path}`)
      : []),
    ...(user.secret_protection.enabled
      ? addedPaths(user.secret_protection.allow_paths, project.secret_protection?.allow_paths).map(
          (path) => `project policy adds secret allow path: ${path}`,
        )
      : []),
  ];
}

function disabledRules(
  overrides: Record<string, DestructiveCommandRuleOverride> | undefined,
  wasEnabled: (id: string) => boolean,
): string[] {
  return Object.entries(overrides ?? {}).flatMap(([id, override]) =>
    override === 'off' && wasEnabled(id) ? [`project policy disables rule ${id}`] : [],
  );
}

function addedPaths(user: readonly string[], project: readonly string[] | undefined): string[] {
  const vouched = new Set(user.map(stripTrailingSlashes));
  return (project ?? []).filter((path) => !vouched.has(stripTrailingSlashes(path)));
}

function stripTrailingSlashes(path: string): string {
  return path.replace(/[\\/]+$/, '');
}
