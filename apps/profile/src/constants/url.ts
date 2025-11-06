import { IS_PRODUCTION_PHASE } from './phase';

export const PROFILE_URL = `https://${IS_PRODUCTION_PHASE ? '' : 'profile.dev.'}${IS_PRODUCTION_PHASE ? 'profile.' : ''}boolti.in/`;
