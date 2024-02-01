import ky, { Options, ResponsePromise } from 'ky';

// TODO 환경 변수로 API 베이스 설정
const API_URL = 'https://dev.api.boolti.in';

export const instance = ky.create({
  prefixUrl: API_URL,
  headers: {
    'content-type': 'application/json',
  },
  hooks: {
    // TODO 인증 관련 헤더 검증 로직 추가
    beforeRequest: [],
    // TODO 서버 에러 처리
    beforeError: [],
  },
});

export async function resultify<T>(response: ResponsePromise) {
  try {
    // TODO 바디가 없는 경우 어떻게 할지 논의 필요
    return await response.json<T>();
  } catch (e) {
    console.error('[fetcher.ts] resultify에서 JSON 파싱을 하는 도중 오류 발생');
    throw e;
  }
}

export const fetcher = {
  get: <T>(pathname: string, options?: Options) => resultify<T>(instance.get(pathname, options)),
  post: <T>(pathname: string, options?: Options) => resultify<T>(instance.post(pathname, options)),
  put: <T>(pathname: string, options?: Options) => resultify<T>(instance.put(pathname, options)),
  delete: <T>(pathname: string, options?: Options) =>
    resultify<T>(instance.delete(pathname, options)),
};
