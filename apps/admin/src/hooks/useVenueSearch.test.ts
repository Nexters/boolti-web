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

const KAKAO_KEYWORD_URL = 'https://dapi.kakao.com/v2/local/search/keyword.json';
const KAKAO_ADDRESS_URL = 'https://dapi.kakao.com/v2/local/search/address.json';

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
  http.get(KAKAO_KEYWORD_URL, () =>
    HttpResponse.json({
      documents: [
        {
          id: 'k1',
          place_name: '롤링홀',
          category_group_code: 'CT1',
          category_group_name: '문화시설',
          address_name: '서울 마포구 상수동',
          road_address_name: '서울 마포구 와우산로 21길 19',
          x: '126.923',
          y: '37.55',
          phone: '',
        },
        {
          id: 'k2',
          place_name: '클럽 FF',
          category_group_code: 'CT1',
          category_group_name: '문화시설',
          address_name: '서울 마포구 와우산로 13길 25',
          road_address_name: '서울 마포구 와우산로 13길 25',
          x: '126.92',
          y: '37.55',
          phone: '',
        },
      ],
    }),
  ),
  http.get(KAKAO_ADDRESS_URL, () =>
    HttpResponse.json({
      documents: [
        {
          address_name: '서울 마포구 와우산로 18길 20',
          address_type: 'ROAD_ADDR',
          x: '126.92',
          y: '37.55',
          address: null,
          road_address: { address_name: '서울 마포구 와우산로 18길 20', road_name: '와우산로 18길', building_name: '' },
        },
      ],
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

  it('검색어 입력 후 디바운싱 거쳐 세 소스 결과 머지', async () => {
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

    const sources = result.current.results.map((r) => r.source);
    expect(sources).toContain('boolti');
    // 카카오 place 중 '롤링홀'은 불티와 이름 일치로 제외돼야 함
    const kakaoPlaceNames = result.current.results
      .filter((r) => r.source === 'kakao_place')
      .map((r) => (r as { placeName: string }).placeName);
    expect(kakaoPlaceNames).not.toContain('롤링홀');
    expect(kakaoPlaceNames).toContain('클럽 FF');

    // 불티가 맨 위에 와야 함
    expect(result.current.results[0].source).toBe('boolti');
  });

  it('한 소스가 실패해도 나머지 결과는 표시', async () => {
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
        const hasKakao = result.current.results.some((r) => r.source.startsWith('kakao'));
        expect(hasKakao).toBe(true);
      },
      { timeout: 3000 },
    );

    expect(result.current.errors?.boolti).toBeTruthy();
  });
});
