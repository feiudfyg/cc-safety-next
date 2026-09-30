import type { UpdateInfo } from '@/hosts/doctor-types';
import { getPackageVersion } from '@/hosts/system-info';

export function checkForUpdates(): Promise<UpdateInfo> {
  return Promise.resolve({
    currentVersion: getPackageVersion(),
    latestVersion: null,
    updateAvailable: false,
  });
}
