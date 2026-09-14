// jsdom의 Request는 Node의 AbortSignal을 거부해서 ky의 timeout 옵션과 충돌한다.
// fetch를 직접 스텁하므로 DOM은 필요 없고, window만 최소한으로 흉내 낸다.
// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// VITE_BASE_API_URL은 배포 환경별로 다르고 gitignore된 .env에만 있어서 끝 슬래시가
// 섞여 들어와도 리뷰로 걸러지지 않는다. 실제로 prod에 끝 슬래시가 들어가 리프레시 URL이
// '//web/...'이 되었고, 게이트웨이가 CORS 헤더 없이 잘라내 무한 401 루프가 났다.
const loadFetcher = async (baseApiUrl: string) => {
  vi.resetModules();
  vi.stubEnv('VITE_BASE_API_URL', baseApiUrl);
  const { fetcher } = await import('@boolti/api');
  return fetcher;
};

const createLocalStorage = () => {
  const entries = new Map<string, string>();
  return {
    getItem: (key: string) => entries.get(key) ?? null,
    setItem: (key: string, value: string) => {
      entries.set(key, String(value));
    },
    removeItem: (key: string) => {
      entries.delete(key);
    },
  };
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

describe('401 이후 토큰 리프레시', () => {
  let requestedUrls: string[];
  let localStorage: ReturnType<typeof createLocalStorage>;

  beforeEach(() => {
    requestedUrls = [];
    localStorage = createLocalStorage();
    localStorage.setItem('accessToken', 'stale-access-token');
    localStorage.setItem('refreshToken', 'stale-refresh-token');

    vi.stubGlobal('window', {
      localStorage,
      navigator: { onLine: true, userAgent: 'vitest' },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  const stubFetch = (respond: (url: string) => Response) => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: Request | string) => {
        const url = typeof input === 'string' ? input : input.url;
        requestedUrls.push(url);
        return respond(url);
      }),
    );
  };

  it.each([
    ['끝 슬래시 없음', 'https://api.example.com'],
    ['끝 슬래시 있음', 'https://api.example.com/'],
  ])('%s: 리프레시 경로에 슬래시가 중복되지 않는다', async (_label, baseApiUrl) => {
    stubFetch((url) => {
      if (url.includes('/login/refresh')) {
        return jsonResponse({ accessToken: 'new-access', refreshToken: 'new-refresh' });
      }
      return requestedUrls.length === 1 ? jsonResponse({}, 401) : jsonResponse({ ok: true });
    });

    const fetcher = await loadFetcher(baseApiUrl);
    await fetcher.get('web/v1/host/shows');

    expect(requestedUrls[1]).toBe('https://api.example.com/web/papi/v1/login/refresh');
    expect(localStorage.getItem('accessToken')).toBe('new-access');
  });

  it('리프레시가 네트워크/CORS 오류로 막히면 죽은 토큰을 지운다', async () => {
    stubFetch((url) => {
      if (url.includes('/login/refresh')) {
        // CORS로 차단된 응답은 HTTPError가 아니라 TypeError로 온다.
        throw new TypeError('Failed to fetch');
      }
      return jsonResponse({}, 401);
    });

    const fetcher = await loadFetcher('https://api.example.com');
    await expect(fetcher.get('web/v1/host/shows')).rejects.toThrow('Failed to fetch');

    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('refreshToken')).toBeNull();
  });
});
