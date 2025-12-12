import { LINK } from '~/constants/link';

export const getStoreLink = (): string => {
  const userAgent = window.navigator.userAgent.toLowerCase();

  const isIOS = /iphone|ipad|ipod/.test(userAgent);

  return isIOS ? LINK.IOS_STORE : LINK.ANDROID_STORE;
};

export const openStoreLink = (): void => {
  window.open(getStoreLink(), '_blank');
};
