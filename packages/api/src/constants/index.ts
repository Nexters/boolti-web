import { ERROR_CODE } from './errorCode';
import { LOCAL_STORAGE } from './storages';

export { ERROR_CODE, LOCAL_STORAGE };

export const API_URL = import.meta.env.VITE_BASE_API_URL;
export const IS_SUPER_ADMIN = import.meta.env.VITE_IS_SUPER_ADMIN === 'true';
