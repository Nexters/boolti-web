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
  prefixUrl: API_URL,
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

            request.headers.set('Authorization', `Bearer ${accessToken}`);
            return ky(request, options);
          } catch (e) {
            if (e instanceof HTTPError && e.response.url.includes('/login/refresh')) {
              window.localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
              window.localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
            }

            if (e instanceof Error) {
              console.warn(`[fether.ts] ${e.name} (${e.message})`);
            }
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
  delete: <T>(pathname: string, options?: Options) =>
    resultify<T>(instance.delete(pathname, options)),
};
