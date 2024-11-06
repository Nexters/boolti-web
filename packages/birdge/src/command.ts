import { WebViewCommand } from './types';
import { checkIsAndroid, checkIsIOS, getUserAgent } from './utils';

export function sendCommand(webViewCommand: WebViewCommand) {
  return window?.webkit?.messageHandlers?.boolti?.postMessage(webViewCommand);
}

export function closeWebView() {
  const userAgent = getUserAgent();

  if (checkIsIOS(userAgent)) {
    return;
  }

  if (checkIsAndroid(userAgent)) {
    return;
  }
}
