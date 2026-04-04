import { IS_PRODUCTION_PHASE } from './phase';

export const EXTERNAL_DOMAIN = {
  PROFILE: `https://${IS_PRODUCTION_PHASE ? '' : 'dev.'}profile.boolti.in`,
} as const;

export const EXTERNAL_URL = {
  USER_PROFILE: (userCode: string) => `${EXTERNAL_DOMAIN.PROFILE}/${userCode}`,
} as const;

export const STORE_LINK = {
  ANDROID: 'https://play.google.com/store/apps/details?id=com.nexters.boolti&hl=ko',
  IOS: 'https://apps.apple.com/kr/app/%EB%B6%88%ED%8B%B0/id6476589322',
} as const;

export const getStoreLink = (): string => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  return isIOS ? STORE_LINK.IOS : STORE_LINK.ANDROID;
};

export const openStoreLink = (): void => {
  window.location.href = getStoreLink();
};
