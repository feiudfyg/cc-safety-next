import type { Environment } from '@/core/environment';
import { doctorIntegrationOrder, type IntegrationId } from '@/hosts/catalog';
import type { DetectContext, HookDetection } from '@/hosts/detect/context';
import type { HookStatus } from '@/hosts/doctor-types';
import { detect as detectOpenCode } from '@/hosts/opencode/detect';

const detectors = {
  opencode: detectOpenCode,
} satisfies Record<IntegrationId, (context: DetectContext) => HookDetection>;

export function detectAllHooks(
  environment: Environment,
  cwd: string,
  options?: Omit<DetectContext, 'cwd' | 'environment'>,
): HookStatus[] {
  const context = { ...options, cwd, environment };
  return doctorIntegrationOrder.map((platform) => toHookStatus(detectors[platform](context)));
}

function toHookStatus(detection: HookDetection): HookStatus {
  if (detection.status === 'not-inspected') {
    return {
      platform: detection.platform,
      detected: false,
      configured: false,
      inspectionStatus: 'not-inspected',
    };
  }

  return {
    platform: detection.platform,
    detected: detection.status !== 'n/a',
    configured: detection.status === 'configured',
    inspectionStatus:
      detection.status !== 'n/a'
        ? 'verified'
        : detection.errors && detection.errors.length > 0
          ? 'failed'
          : 'not-applicable',
    method: detection.method,
    configPath: detection.configPath,
    configPaths: detection.configPaths,
    errors: detection.errors,
  };
}
