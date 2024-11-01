export const WEBVIEW_REGEX = /BOOLTI\/(ANDROID|IOS)/;
export const OS_REGEX = /(?<=BOOLTI\/).*/;

export const isWebView = (userAgent: string) => WEBVIEW_REGEX.test(userAgent);

export const getWebViewOS = (userAgent: string) => {
  const regexResult = OS_REGEX.exec(userAgent);
  return regexResult === null ? undefined : regexResult[0];
};

export const isAndroid = (userAgent: string) => {
  if (!isWebView(userAgent)) return false;
  return getWebViewOS(userAgent) === 'ANDROID';
};

export const isIOS = (userAgent: string) => {
  if (!isWebView(userAgent)) return false;
  return getWebViewOS(userAgent) === 'IOS';
};
