import type { ClientInfo } from '@boolti/bridge';

// Native messages are runtime input. Copy only the agreed analytics fields.
export const parseClientInfo = (value: unknown): ClientInfo => {
  if (!value || typeof value !== 'object') throw new Error('Invalid client info');
  const info = value as Record<string, unknown>;
  if (
    (info.platform !== 'iOS' && info.platform !== 'Android') ||
    typeof info.isLoggedIn !== 'boolean' ||
    (info.isLoggedIn
      ? typeof info.userId !== 'string' || !info.userId.trim() || info.userId !== info.userId.trim()
      : info.userId !== null) ||
    !['osVersion', 'appVersion', 'deviceModel'].every(
      (key) => typeof info[key] === 'string' && (info[key] as string).trim().length > 0,
    ) ||
    typeof info.screenResolution !== 'string' ||
    !/^[1-9]\d*x[1-9]\d*$/.test(info.screenResolution)
  )
    throw new Error('Invalid client info');
  return {
    platform: info.platform as ClientInfo['platform'],
    osVersion: info.osVersion as string,
    appVersion: info.appVersion as string,
    deviceModel: info.deviceModel as string,
    screenResolution: info.screenResolution,
    isLoggedIn: info.isLoggedIn,
    userId: info.userId as string | null,
  };
};
