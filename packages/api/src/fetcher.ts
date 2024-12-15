import type { Options, ResponsePromise } from 'ky';
import ky, { HTTPError } from 'ky';

import { LOCAL_STORAGE } from './constants';
import { checkIsWebView, isWebViewBridgeAvailable, requestToken } from '@boolti/bridge';

const API_URL = import.meta.env.VITE_BASE_API_URL;
const IS_SUPER_ADMIN = import.meta.env.VITE_IS_SUPER_ADMIN === 'true';

interface PostRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

const postRefreshToken = async () => {
  const refreshToken = window.localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN);

  if (refreshToken) {
    const response = await ky.post(
      `${API_URL}/${IS_SUPER_ADMIN ? 'sa-api' : 'web'}/papi/v1/login/refresh`,
      {
        json: {
          refreshToken,
        },
      },
    );
    return await response.json<PostRefreshTokenResponse>();
  }
};

const defaultOption: Options = {
  retry: 0,
  timeout: 30_000,
};

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
        // access token이 만료되었을 때, refresh token으로 새로운 access token을 발급받는다.
        if (!response.ok && response.status === 401 && !request.url.includes('logout')) {
          let newAccessToken: string | undefined = undefined,
            newRefreshToken: string | undefined = undefined;
          try {
            if (checkIsWebView() && isWebViewBridgeAvailable()) {
              newAccessToken = (await requestToken()).data.token;
            } else {
              const { accessToken, refreshToken } = (await postRefreshToken()) ?? {};
              newAccessToken = accessToken;
              newRefreshToken = refreshToken;
            }

            if (newAccessToken) {
              window.localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, newAccessToken);

              if (newRefreshToken) {
                window.localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, newRefreshToken);
              }

              request.headers.set('Authorization', `Bearer ${newAccessToken}`);
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
