import { IS_PRODUCTION_PHASE } from './phase';

export const LINK = {
  TERMS: 'https://boolti.notion.site/b4c5beac61c2480886da75a1f3afb982',
  PRIVACY_POLICY: 'https://boolti.notion.site/5f73661efdcd4507a1e5b6827aa0da70',
  APP_QR: `https://boolti.page.link/?link=https://app.boolti.in/home/shows?apn=com.nexters.boolti${IS_PRODUCTION_PHASE ? '' : '.debug'}&ibi=com.nexters.boolti&isi=6476589322`,
  BOOLTI_KAKAO_CHANNEL: 'http://pf.kakao.com/_pVxfxaG/chat',
};
