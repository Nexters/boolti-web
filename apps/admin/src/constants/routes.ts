export const PATH = {
  INDEX: '/',
  LOGIN: '/login',
  OAUTH_KAKAO: '/oauth/kakao',
  OAUTH_APPLE: '/oauth/apple',
  SIGNUP_COMPLETE: '/signup/complete',
  HOME: '/home',
  SHOW_ADD: '/show/add',
  QR: '/qr',
  SHOW_ADD_TICKET: '/show/add/ticket',
  SHOW_ADD_COMPLETE: '/show/add/complete',
  SHOW_INFO: '/show/:showId/info',
  SHOW_TICKET: '/show/:showId/ticket',
  SHOW_RESERVATION: '/show/:showId/reservation',
  SHOW_ENTRANCE: '/show/:showId/enterance',
  SHOW_SETTLEMENT: '/show/:showId/settlement',
  SITE_POLICY: '/site-policy/:policyId',
} as const;

export const HREF = {
  SHOW_INFO: (showId: string | number) => `/show/${showId}/info`,
  SHOW_TICKET: (showId: string | number) => `/show/${showId}/ticket`,
  SHOW_RESERVATION: (showId: string | number) => `/show/${showId}/reservation`,
  SHOW_ENTRANCE: (showId: string | number) => `/show/${showId}/enterance`,
  SHOW_SETTLEMENT: (showId: string | number) => `/show/${showId}/settlement`,
};
