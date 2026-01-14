import { IS_PRODUCTION_PHASE } from './phase';

export const EXTERNAL_DOMAIN = {
  SHOW_MANAGER: `https://${IS_PRODUCTION_PHASE ? '' : 'dev.'}preview.boolti.in`,
} as const;

export const EXTERNAL_URL = {
  SHOW_MANAGER_INFO: (showId: string | number) =>
    `${EXTERNAL_DOMAIN.SHOW_MANAGER}/show/${showId}?referrer=profile`,
} as const;
