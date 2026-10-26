import { checkIsWebView } from '@boolti/bridge';

import type { Platform } from './constants';

const MOBILE_REGEX = /Android|iPhone|iPad|iPod|Mobile/i;

const OS_VERSION_PATTERNS: RegExp[] = [
  /OS (\d+[_.]\d+(?:[_.]\d+)?) like Mac OS X/, // iOS
  /Android (\d+(?:\.\d+)*)/,
  /Mac OS X (\d+[_.]\d+(?:[_.]\d+)?)/,
  /Windows NT (\d+\.\d+)/,
];

export const getPlatform = (userAgent = window.navigator.userAgent): Platform =>
  MOBILE_REGEX.test(userAgent) ? 'Web_mobile' : 'Web_desktop';

export const getOsVersion = (userAgent = window.navigator.userAgent) => {
  for (const pattern of OS_VERSION_PATTERNS) {
    const matched = pattern.exec(userAgent);
    if (matched) return matched[1].replace(/_/g, '.');
  }
  return undefined;
};

/** 공통 속성 시트의 값. 웹에서 알 수 없는 app_version, device_model 은 넣지 않는다. */
export const getCommonProperties = () => ({
  platform: getPlatform(),
  os_version: getOsVersion(),
  screen_resolution: `${window.screen.width}x${window.screen.height}`,
  is_webview: checkIsWebView(),
});
