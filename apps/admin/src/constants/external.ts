export const EXTERNAL_DOMAIN = {
  SHOW_MANAGER: 'https://boolti.in',
  SHOW_TICKET_PREVIEW: 'https://preview.boolti.in',
} as const;

export const EXTERNAL_URL = {
  SHOW_MANAGER_INFO: (showId: string | number) =>
    `${EXTERNAL_DOMAIN.SHOW_MANAGER}/show/${showId}/info`,

  SHOW_TICKET_PREVIEW: (showId: string | number) =>
    `${EXTERNAL_DOMAIN.SHOW_TICKET_PREVIEW}/show/${showId}`,
} as const;
