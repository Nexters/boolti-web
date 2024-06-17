import type { Options, ResponsePromise } from 'ky';
import ky from 'ky';

import BooltiHTTPError, { isBooltiHTTPError } from './BooltiHTTPError';
import { LOCAL_STORAGE } from './constants';

const API_URL = import.meta.env.VITE_BASE_API_URL;
const IS_SUPER_ADMIN = import.meta.env.IS_SUPER_ADMIN === 'true';

interface PostRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

const postRefreshToken = async () => {
  const response = await ky.post(
    `${API_URL}/${IS_SUPER_ADMIN ? 'sa-api' : 'web'}/papi/v1/login/refresh`,
    {
      json: {
        refreshToken: window.localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN),
      },
    },
  );

  return await response.json<PostRefreshTokenResponse>();
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
        if (!response.ok && response.status === 401) {
          try {
            const { accessToken, refreshToken } = await postRefreshToken();

            window.localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, accessToken);
            window.localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, refreshToken);

            request.headers.set('Authorization', `Bearer ${accessToken}`);

            return ky(request);
          } catch (error) {
            throw new BooltiHTTPError(response, request, options);
          }
        }

        if (!response.ok) {
          const body = await response.json();

          if (body) {
            throw new BooltiHTTPError(response, request, options, {
              errorTraceId: body.errorTraceId,
              type: body.type,
              detail: body.detail,
            });
          }

          throw new BooltiHTTPError(response, request, options);
        }
      },
    ],
  },
  retry: 0,
  timeout: 30_000,
});

export async function resultify<T>(response: ResponsePromise) {
  try {
    return await response.json<T>();
  } catch (error) {
    if (error instanceof Error && isBooltiHTTPError(error)) {
      console.error('[BooltiHTTPError] errorTraceId:', error.errorTraceId);
      console.error('[BooltiHTTPError] type', error.type);
      console.error('[BooltiHTTPError] detail', error.detail);
    }
    throw error;
  }
}

export const fetcher = {
  get: <T>(pathname: string, options?: Options) => resultify<T>(instance.get(pathname, options)),
  post: <T>(pathname: string, options?: Options) => resultify<T>(instance.post(pathname, options)),
  put: <T>(pathname: string, options?: Options) => resultify<T>(instance.put(pathname, options)),
  delete: <T>(pathname: string, options?: Options) =>
    resultify<T>(instance.delete(pathname, options)),
};
