import { IS_PRODUCTION_PHASE } from './phase';

export const LINK = {
  ANDROID_STORE: 'https://play.google.com/store/apps/details?id=com.nexters.boolti&hl=ko',
  IOS_STORE: 'https://apps.apple.com/kr/app/%EB%B6%88%ED%8B%B0/id6476589322',
  SHOW_DETAIL: (showId?: number) =>
    `https://${IS_PRODUCTION_PHASE ? '' : 'dev.'}preview.boolti.in/show/${showId}`,
};
