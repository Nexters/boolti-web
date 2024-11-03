export const WEBVIEW_REGEX = /BOOLTI\/(ANDROID|IOS)/;
export const OS_REGEX = /(?<=BOOLTI\/).*/;

export const checkIsWebView = (userAgent: string) => WEBVIEW_REGEX.test(userAgent);

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
