import type { Options, ResponsePromise } from 'ky';
import ky, { HTTPError } from 'ky';

import { API_URL, LOCAL_STORAGE } from './constants';
import { Mutex } from 'async-mutex';
import { refreshAccessToken } from './refreshAccessToken';

const defaultOption: Options = {
  retry: 0,
  timeout: 30_000,
};

const tokenRefreshMutex = new Mutex();

export const instance = ky.create({
  // API_URL이 빈 문자열이면(dev proxy 설정) ky가 prefixUrl 적용을 생략해서, fetcher가
  // 받는 경로(예: "web/papi/...")가 origin이 아닌 "현재 페이지 경로" 기준 상대 경로로
  // resolve된다. 라우트 깊이에 관계없이 항상 origin 기준 절대 경로가 되도록 최소 '/'를 보장한다.
  prefixUrl: API_URL || '/',
  headers: {
    'content-type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = window.localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);

        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (!response.ok && response.status === 401 && !request.url.includes('logout')) {
          try {
            let accessToken: string | undefined;

            if (tokenRefreshMutex.isLocked()) {
              await tokenRefreshMutex.waitForUnlock();

              const newAccessToken = window.localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);

              if (newAccessToken) {
                accessToken = newAccessToken;
              }
            } else {
              await tokenRefreshMutex.acquire();
              accessToken = await refreshAccessToken();
            }

            if (accessToken) {
              request.headers.set('Authorization', `Bearer ${accessToken}`);
              return ky(request, options);
            }
          } catch (e) {
            if (e instanceof HTTPError && e.response.url.includes('/login/refresh')) {
              window.localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
              window.localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
            }

            if (e instanceof Error) {
              console.warn(`[fether.ts] ${e.name} (${e.message})`);
            }
            throw e;
          } finally {
            tokenRefreshMutex.release();
          }
        }
        return response;
      },
    ],
  },
  ...defaultOption,
});

export async function resultify<T>(response: ResponsePromise) {
  return await response.json<T>();
}

export const fetcher = {
  get: <T>(pathname: string, options?: Options) => resultify<T>(instance.get(pathname, options)),
  post: <T>(pathname: string, options?: Options) => resultify<T>(instance.post(pathname, options)),
  put: <T>(pathname: string, options?: Options) => resultify<T>(instance.put(pathname, options)),
  patch: <T>(pathname: string, options?: Options) =>
    resultify<T>(instance.patch(pathname, options)),
  delete: <T>(pathname: string, options?: Options) =>
    resultify<T>(instance.delete(pathname, options)),
};
