import { OS_REGEX, WEBVIEW_REGEX } from './constants';
import { v4 as uuidv4 } from 'uuid';

export const getUserAgent = () => window.navigator.userAgent;

export const checkIsWebView = (userAgent: string = window.navigator.userAgent) =>
  WEBVIEW_REGEX.test(userAgent);

export const getWebViewOS = (userAgent: string) => {
  const regexResult = OS_REGEX.exec(userAgent);
  return regexResult === null ? undefined : regexResult[0];
};

export const checkIsAndroid = (userAgent: string) => {
  if (!checkIsWebView(userAgent)) return false;
  return getWebViewOS(userAgent) === 'ANDROID';
};

export const checkIsIOS = (userAgent: string) => {
  if (!checkIsWebView(userAgent)) return false;
  return getWebViewOS(userAgent) === 'IOS';
};

export const getTimeStamp = () => new Date().valueOf().toString();

export const getUuid = () => uuidv4();

export const hasAndroidPostMessage = () =>
  !!(typeof window !== 'undefined' && window.boolti && window.boolti.postMessage);

export const hasWebkitPostMessage = () =>
  !!(
    typeof window !== 'undefined' &&
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.boolti &&
    window.webkit.messageHandlers.boolti.postMessage
  );

export const isWebViewBridgeAvailable = () => hasAndroidPostMessage() || hasWebkitPostMessage();
