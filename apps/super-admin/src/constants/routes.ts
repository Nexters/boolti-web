export const PATH = {
  INDEX: '/',
  LOGIN: '/login',
  ADMIN_USERS: '/admin-users',
  INFO: '/show/:showId/info',
  TICKET: '/show/:showId/ticket',
  PAYMENT: '/show/:showId/payment',
  ENTRANCE: '/show/:showId/entrance',
  SETTLEMENT: '/show/:showId/settlement',
  CONCERT_HALL_INFO: '/place/:hallId/info',
  CONCERT_HALL_RENTAL: '/place/:hallId/rental',
  CONCERT_HALL_DATA: '/place/:hallId/data',
} as const;

export const HREF = {
  /** 홈의 공연장 탭. 공연장 페이지에서 목록으로 돌아갈 때 쓴다. */
  CONCERT_HALL_LIST: () => `${PATH.INDEX}?tab=concert-halls`,
  INFO: (showId: string | number) => `/show/${showId}/info`,
  TICKET: (showId: string | number) => `/show/${showId}/ticket`,
  PAYMENT: (showId: string | number) => `/show/${showId}/payment`,
  ENTRANCE: (showId: string | number) => `/show/${showId}/entrance`,
  SETTLEMENT: (showId: string | number) => `/show/${showId}/settlement`,
  CONCERT_HALL_INFO: (hallId: string | number) => `/place/${hallId}/info`,
  CONCERT_HALL_RENTAL: (hallId: string | number) => `/place/${hallId}/rental`,
  CONCERT_HALL_DATA: (hallId: string | number) => `/place/${hallId}/data`,
};
