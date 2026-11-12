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
  let requestedAuthHeaders: Array<string | null>;
  let localStorage: ReturnType<typeof createLocalStorage>;

  beforeEach(() => {
    requestedUrls = [];
    requestedAuthHeaders = [];
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
        requestedAuthHeaders.push(
          typeof input === 'string' ? null : input.headers.get('authorization'),
        );
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
    // 재시도 요청은 새로 받은 토큰을 싣는다.
    expect(requestedAuthHeaders[2]).toBe('Bearer new-access');
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

  it('새 토큰으로 재시도한 요청도 401이면 한 번에 끝낸다(갱신과 재요청을 반복하지 않는다)', async () => {
    let refreshCount = 0;
    stubFetch((url) => {
      if (url.includes('/login/refresh')) {
        refreshCount += 1;
        // 안전장치. 루프가 생겨도 테스트가 끝나도록 일정 횟수 뒤에는 성공시킨다.
        if (refreshCount > 10) return jsonResponse({}, 400);
        return jsonResponse({ accessToken: `new-${refreshCount}`, refreshToken: 'r' });
      }
      return jsonResponse({}, 401);
    });

    const fetcher = await loadFetcher('https://api.example.com');
    await expect(fetcher.get('web/papi/v1/concert-halls/7')).rejects.toThrow();

    // 원래 요청 1번, 리프레시 1번, 재시도 1번.
    expect(refreshCount).toBe(1);
    expect(requestedUrls).toHaveLength(3);
    // 재시도 실패는 리프레시 실패가 아니므로 새로 받은 토큰을 지우지 않는다.
    expect(localStorage.getItem('accessToken')).toBe('new-1');
  });

  it('재시도 중에 요청을 취소해도 새로 받은 토큰을 지우지 않는다', async () => {
    const controller = new AbortController();
    stubFetch((url) => {
      if (url.includes('/login/refresh')) {
        return jsonResponse({ accessToken: 'new-access', refreshToken: 'new-refresh' });
      }
      if (requestedUrls.length === 1) return jsonResponse({}, 401);
      // 재시도 요청이 나가는 순간 취소한다(검색어를 바꿔 이전 검색을 끊는 상황).
      controller.abort();
      throw new DOMException('aborted', 'AbortError');
    });

    const fetcher = await loadFetcher('https://api.example.com');
    await expect(
      fetcher.get('web/v1/host/concert-halls', { signal: controller.signal }),
    ).rejects.toThrow();

    expect(localStorage.getItem('accessToken')).toBe('new-access');
    expect(localStorage.getItem('refreshToken')).toBe('new-refresh');
  });

  it('동시에 401이 나도 리프레시는 한 번만 한다', async () => {
    let refreshCount = 0;
    stubFetch((url) => {
      if (url.includes('/login/refresh')) {
        refreshCount += 1;
        return jsonResponse({ accessToken: `new-${refreshCount}`, refreshToken: 'r' });
      }
      return localStorage.getItem('accessToken') === 'stale-access-token' &&
        !requestedUrls.some((u) => u.includes('/login/refresh'))
        ? jsonResponse({}, 401)
        : jsonResponse({ ok: true });
    });

    const fetcher = await loadFetcher('https://api.example.com');
    await Promise.all([
      fetcher.get('web/v1/host/shows'),
      fetcher.get('web/v1/host/concert-halls'),
      fetcher.get('web/papi/v1/concert-halls/7'),
    ]);

    expect(refreshCount).toBe(1);
  });
});
