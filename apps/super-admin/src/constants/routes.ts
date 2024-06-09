export const PATH = {
  INDEX: '/',
  LOGIN: '/login',
  SETTLEMENT: '/show/:showId/settlement',
} as const;

export const HREF = {
  SETTLEMENT: (showId: string | number) => `/show/${showId}/settlement`,
};
