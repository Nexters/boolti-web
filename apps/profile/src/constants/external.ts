import { IS_PRODUCTION_PHASE } from './phase';

export const EXTERNAL_DOMAIN = {
  SHOW_MANAGER: `https://${IS_PRODUCTION_PHASE ? '' : 'dev.'}boolti.in`,
  SHOW_TICKET_PREVIEW: `https://${IS_PRODUCTION_PHASE ? '' : 'dev.'}preview.boolti.in`,
} as const;

export const EXTERNAL_URL = {
  SHOW_MANAGER_INFO: (showId: string | number) =>
    `${EXTERNAL_DOMAIN.SHOW_MANAGER}/show/${showId}/info`,

  SHOW_TICKET_PREVIEW: (showId: string | number) =>
    `${EXTERNAL_DOMAIN.SHOW_TICKET_PREVIEW}/show/${showId}`,
} as const;
