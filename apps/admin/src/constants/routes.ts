export const PATH = {
  INDEX: '/',
  QR: '/qr',
  HOME: '/home',

  LOGIN: '/login',
  OAUTH_KAKAO: '/oauth/kakao',
  OAUTH_APPLE: '/oauth/apple',
  SIGNUP_COMPLETE: '/signup/complete',

  SHOW_ADD: '/show/add',
  SHOW_ADD_DETAIL: '/show/add/detail',
  SHOW_ADD_SALES: '/show/add/sales',
  SHOW_TYPE_SELECT: '/show/add/type',

  SHOW_INFO: '/show/:showId/info',
  SHOW_TICKET: '/show/:showId/ticket',
  SHOW_RESERVATION: '/show/:showId/reservation',
  SHOW_ENTRANCE: '/show/:showId/enterance',
  SHOW_SETTLEMENT: '/show/:showId/settlement',

  SITE_POLICY: '/site-policy/:policyId',
  GIFT_INTRO: '/gift/:giftId',
  GIFT_REGISTER: '/gift/:giftId/register',

  WEBVIEW: '/webview',
} as const;

export const HREF = {
  SHOW_INFO: (showId: string | number) => `/show/${showId}/info`,
  SHOW_TICKET: (showId: string | number) => `/show/${showId}/ticket`,
  SHOW_RESERVATION: (showId: string | number) => `/show/${showId}/reservation`,
  SHOW_ENTRANCE: (showId: string | number) => `/show/${showId}/enterance`,
  SHOW_SETTLEMENT: (showId: string | number) => `/show/${showId}/settlement`,
};
