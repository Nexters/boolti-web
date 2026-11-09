import { checkIsWebView, isWebViewBridgeAvailable, type ClientInfo } from '@boolti/bridge';

import type { Platform } from './constants';

const MOBILE_REGEX = /Android|iPhone|iPad|iPod|Mobile/i;

const OS_VERSION_PATTERNS: RegExp[] = [
  /OS (\d+[_.]\d+(?:[_.]\d+)?) like Mac OS X/, // iOS
  /Android (\d+(?:\.\d+)*)/,
  /Mac OS X (\d+[_.]\d+(?:[_.]\d+)?)/,
  /Windows NT (\d+\.\d+)/,
];

export const getPlatform = (userAgent = window.navigator.userAgent): Platform =>
  MOBILE_REGEX.test(userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    ? 'Web_mobile'
    : 'Web_desktop';

export const getOsVersion = (userAgent = window.navigator.userAgent) => {
  for (const pattern of OS_VERSION_PATTERNS) {
    const matched = pattern.exec(userAgent);
    if (matched) return matched[1].replace(/_/g, '.');
  }
  return undefined;
};

/** 웹뷰에서는 앱이 응답한 OS/기기 정보와 물리 픽셀 해상도를 사용한다. */
export const getCommonProperties = (clientInfo?: ClientInfo) => ({
  platform: clientInfo?.platform ?? getPlatform(),
  os_version: clientInfo?.osVersion ?? getOsVersion(),
  app_version: clientInfo?.appVersion,
  device_model: clientInfo?.deviceModel,
  screen_resolution:
    clientInfo?.screenResolution ?? `${window.screen.width}x${window.screen.height}`,
  is_webview: checkIsWebView() || isWebViewBridgeAvailable(),
});
