import { UAParser } from 'ua-parser-js';
import { OS } from 'ua-parser-js/enums';
import { LINK } from '~/constants/link';

export const getStoreLink = () => {
  const { os } = UAParser(window.navigator.userAgent);

  switch (os.name) {
    case OS.IOS:
      return LINK.IOS_STORE;
    default:
      return LINK.ANDROID_STORE;
  }
};

export const openStoreLink = () => {
  window.open(getStoreLink(), '_blank');
};
