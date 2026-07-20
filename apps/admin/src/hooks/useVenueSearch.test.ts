// @vitest-environment jsdom
import { renderHook, act, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

// fetcher (ky) reads VITE_BASE_API_URL at module load, so we mock @boolti/api's
// fetcher to a thin fetch wrapper. MSW handlers below intercept the requests.
vi.mock('@boolti/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@boolti/api')>();
  return {
    ...actual,
    fetcher: {
      get: async <T>(path: string, options?: { searchParams?: Record<string, string | number> }) => {
        const url = new URL(path, 'https://api.test.local/');
        if (options?.searchParams) {
          for (const [k, v] of Object.entries(options.searchParams)) {
            url.searchParams.set(k, String(v));
          }
        }
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return (await res.json()) as T;
      },
    },
  };
});

import useVenueSearch from './useVenueSearch';

const server = setupServer(
  http.get('*/web/v1/host/concert-halls', () =>
    HttpResponse.json({
      items: [
        { id: 1, name: '롤링홀', address: '서울 마포구 와우산로 21길 19', isVisible: true },
      ],
      currentPage: 0,
      pageSize: 5,
      totalElements: 1,
      totalPages: 1,
      hasNext: false,
    }),
  ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('useVenueSearch', () => {
  it('빈 쿼리이면 API 호출하지 않고 빈 결과 반환', async () => {
    const { result } = renderHook(() => useVenueSearch());
    expect(result.current.results).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it('검색어 입력 후 디바운싱 거쳐 불티 등록 공연장 결과 반환', async () => {
    // NOTE: Real timers are used here because fake timers interact poorly with
    // fetch + MSW + setTimeout-based debouncing under jsdom. waitFor polls until
    // the debounced search completes.
    const { result } = renderHook(() => useVenueSearch());

    act(() => {
      result.current.setQuery('롤링홀');
    });

    await waitFor(
      () => {
        expect(result.current.results.length).toBeGreaterThan(0);
      },
      { timeout: 3000 },
    );

    expect(result.current.results.every((r) => r.source === 'boolti')).toBe(true);
    expect(result.current.results[0]).toMatchObject({
      source: 'boolti',
      concertHallId: 1,
      name: '롤링홀',
    });
  });

  it('불티 검색 실패 시 빈 결과와 boolti 에러를 반환', async () => {
    server.use(
      http.get('*/web/v1/host/concert-halls', () =>
        HttpResponse.json({ message: 'server error' }, { status: 500 }),
      ),
    );

    const { result } = renderHook(() => useVenueSearch());

    act(() => {
      result.current.setQuery('롤링홀');
    });

    await waitFor(
      () => {
        expect(result.current.errors?.boolti).toBeTruthy();
      },
      { timeout: 3000 },
    );

    expect(result.current.results).toEqual([]);
  });
});
