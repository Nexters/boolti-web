const BASE_SCHEME = 'boolti://';

interface SchemeOptions {
  path: string;
  query?: Record<string, string | number | boolean | undefined>;
}

export function createAppScheme({ path, query }: SchemeOptions): string {
  const queryString = query
    ? '?' +
      Object.entries(query)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
        .join('&')
    : '';
  return `${BASE_SCHEME}${path}${queryString}`;
}

export const SCHEMES = {
  홈: () => createAppScheme({ path: 'home' }),
  선물_등록: (giftId: string) => createAppScheme({ path: `gift/${giftId}` }),
  브릿지_스토어: () => createAppScheme({ path: 'bridge/store' }),
};
