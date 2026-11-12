import type { Options, ResponsePromise } from 'ky';
import ky from 'ky';

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
          // 이 요청이 직접 잡은 락만 푼다. 기다리기만 한 요청이 다른 요청의 갱신 락을 풀면
          // 갱신이 동시에 여러 번 일어난다.
          let acquiredLock = false;
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
              acquiredLock = true;
              accessToken = await refreshAccessToken();
            }

            if (accessToken) {
              request.headers.set('Authorization', `Bearer ${accessToken}`);
              // 재시도는 한 번만 한다. 재시도 요청이 이 훅을 다시 타면, 서버가 새 토큰도 401로
              // 거절할 때 갱신과 재요청이 끝없이 반복된다. 재시도가 401이면 HTTPError로 끝낸다.
              // 새 토큰은 위에서 헤더에 직접 넣었으므로 beforeRequest 훅도 필요 없다.
              return ky(request, { ...options, hooks: { afterResponse: [] } });
            }
          } catch (e) {
            // 리프레시가 실패하면 토큰은 죽은 것으로 본다. CORS 차단이나 네트워크 오류는
            // HTTPError가 아니라 TypeError로 오기 때문에 에러 타입으로 판단하지 않는다.
            // 오프라인은 토큰 문제가 아니므로 제외한다.
            if (window.navigator.onLine) {
              window.localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
              window.localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
            }

            if (e instanceof Error) {
              console.warn(`[fether.ts] ${e.name} (${e.message})`);
            }
            throw e;
          } finally {
            if (acquiredLock) tokenRefreshMutex.release();
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
