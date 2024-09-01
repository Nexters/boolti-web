export const PATH = {
  INDEX: '/',
  LOGIN: '/login',
  INFO: '/show/:showId/info',
  TICKET: '/show/:showId/ticket',
  PAYMENT: '/show/:showId/payment',
  ENTRANCE: '/show/:showId/entrance',
  SETTLEMENT: '/show/:showId/settlement',
} as const;

export const HREF = {
  INFO: (showId: string | number) => `/show/${showId}/info`,
  TICKET: (showId: string | number) => `/show/${showId}/ticket`,
  PAYMENT: (showId: string | number) => `/show/${showId}/payment`,
  ENTRANCE: (showId: string | number) => `/show/${showId}/entrance`,
  SETTLEMENT: (showId: string | number) => `/show/${showId}/settlement`,
};
