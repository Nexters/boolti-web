import { OS_REGEX, WEBVIEW_REGEX } from './constants';

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
