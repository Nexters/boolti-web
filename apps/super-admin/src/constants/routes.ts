export const PATH = {
  INDEX: '/',
  LOGIN: '/login',
  ADMIN_USERS: '/admin-users',
  INFO: '/show/:showId/info',
  TICKET: '/show/:showId/ticket',
  PAYMENT: '/show/:showId/payment',
  ENTRANCE: '/show/:showId/entrance',
  SETTLEMENT: '/show/:showId/settlement',
  CONCERT_HALL_INFO: '/concert-hall/:hallId/info',
  CONCERT_HALL_RENTAL: '/concert-hall/:hallId/rental',
  CONCERT_HALL_DATA: '/concert-hall/:hallId/data',
} as const;

export const HREF = {
  INFO: (showId: string | number) => `/show/${showId}/info`,
  TICKET: (showId: string | number) => `/show/${showId}/ticket`,
  PAYMENT: (showId: string | number) => `/show/${showId}/payment`,
  ENTRANCE: (showId: string | number) => `/show/${showId}/entrance`,
  SETTLEMENT: (showId: string | number) => `/show/${showId}/settlement`,
  CONCERT_HALL_INFO: (hallId: string | number) => `/concert-hall/${hallId}/info`,
  CONCERT_HALL_RENTAL: (hallId: string | number) => `/concert-hall/${hallId}/rental`,
  CONCERT_HALL_DATA: (hallId: string | number) => `/concert-hall/${hallId}/data`,
};
