import type { LoginMethod } from '@boolti/analytics';

/** View Screen(Login) 의 source 값 */
export const LOGIN_SOURCE = {
  DIRECT: 'Direct',
  AUTH_REQUIRED: 'AuthRequired',
  SESSION_EXPIRED: 'SessionExpired',
  QR: 'QR',
} as const;

export type LoginLocationState = { source?: string } | null;

/** 회원가입 완료 화면으로 넘기는 state */
export type SignUpLocationState = { loginMethod?: LoginMethod } | null;

/** 공연 유형 선택 노출(Impression) 의 source 값 */
export const SHOW_TYPE_SELECT_SOURCE = {
  SHOW_LIST: 'ShowList',
  REGISTER_LINK: 'RegisterLink',
  TYPE_SELECT_PAGE: 'TypeSelectPage',
} as const;

export type ShowTypeSelectSource =
  (typeof SHOW_TYPE_SELECT_SOURCE)[keyof typeof SHOW_TYPE_SELECT_SOURCE];
