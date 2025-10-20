const BASE_SCHEME = 'boolti://';

export const SCHEMES = {
  선물_등록: (giftId: string) => `${BASE_SCHEME}gift/${giftId}`,
};
