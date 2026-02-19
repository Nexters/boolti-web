import { IS_PRODUCTION_PHASE } from './phase';

export const EXTERNAL_DOMAIN = {
  PROFILE: `https://${IS_PRODUCTION_PHASE ? '' : 'dev.'}profile.boolti.in`,
} as const;

export const EXTERNAL_URL = {
  USER_PROFILE: (userCode: string) => `${EXTERNAL_DOMAIN.PROFILE}/${userCode}`,
} as const;
