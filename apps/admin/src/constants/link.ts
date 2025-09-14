import { IS_PRODUCTION_PHASE } from './phase';

export const LINK = {
  TERMS: 'https://boolti.notion.site/b4c5beac61c2480886da75a1f3afb982',
  PRIVACY_POLICY: 'https://boolti.notion.site/5f73661efdcd4507a1e5b6827aa0da70',
  BOOLTI_KAKAO_CHANNEL: 'http://pf.kakao.com/_pVxfxaG/chat',
  ANDROID_STORE: 'https://play.google.com/store/apps/details?id=com.nexters.boolti&hl=ko',
  IOS_STORE: 'https://apps.apple.com/kr/app/%EB%B6%88%ED%8B%B0/id6476589322',
  SHOW_DETAIL: (showId?: number) =>
    `https://${IS_PRODUCTION_PHASE ? '' : 'dev.'}preview.boolti.in/show/${showId}`,
};
