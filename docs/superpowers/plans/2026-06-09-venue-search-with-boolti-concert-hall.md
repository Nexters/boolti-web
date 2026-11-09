# 공연장 검색 + 불티 등록 공연장 자동 연결 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 카카오 지도 검색 + 불티 등록 공연장 검색을 통합한 단일 드롭다운으로 공연장을 선택하면 `concertHallId`가 폼에 저장되어 백엔드 자동 연결까지 이뤄진다.

**Architecture:** `useVenueSearch` 통합 훅이 카카오 keyword/address fetch와 불티 `searchConcertHalls`를 `Promise.allSettled`로 병렬 호출·머지하여 단일 결과 리스트를 반환한다. 불티 공연장을 명시적으로 선택하면 `getProfile_1`로 위경도를 확보하고 `concertHallId`까지 폼에 저장한다. `useKakaoLocalSearch`는 `useVenueSearch`로 대체되어 삭제된다.

**Tech Stack:** TypeScript, React, TanStack Query, ky, vitest, @testing-library/react. 디자인 스펙: `docs/superpowers/specs/2026-06-09-venue-search-with-boolti-concert-hall-design.md`.

---

## File Structure

**신규**
- `packages/api/src/types/concertHall.ts` — `ConcertHallItem`, `WebHostConcertHallListResponse`, `ConcertHallProfileResponse`, `ConcertHallLocation` 등 응답 타입
- `packages/api/src/queries/useConcertHallSearch.ts` — `searchConcertHalls` TanStack Query 훅
- `packages/api/src/queries/useConcertHallProfile.ts` — `getProfile_1` TanStack Query 훅
- `apps/admin/src/hooks/useVenueSearch.ts` — 통합 검색 훅 (카카오 + 불티 + 디바운싱 + 머지)
- `apps/admin/src/hooks/useVenueSearch.test.ts` — 유닛 테스트
- `apps/admin/src/components/PlaceSearchInput/PlaceSearchInput.test.tsx` — 컴포넌트 테스트

**수정**
- `packages/api/src/types/index.ts` — `concertHall` 타입 re-export
- `packages/api/src/types/show.ts` — `ShowCreateRequest`, `NonTicketingShowCreateRequest`에 `concertHallId?: number` 추가
- `packages/api/src/queryKey.ts` — `concertHallQueryKeys` 추가, `mergeQueryKeys`에 포함
- `packages/api/src/queries/index.ts` — `useConcertHallSearch`, `useConcertHallProfile` export
- `packages/api/src/mutations/useEditShowInfo.ts` — `PutShowInfoRequest`에 `concertHallId?: number` 추가
- `apps/admin/src/components/PlaceSearchInput/index.tsx` — `useVenueSearch` 사용, 섹션 헤더·배지, `onSelect` 시그니처 확장, 불티 선택 시 profile fetch
- `apps/admin/src/components/PlaceSearchInput/PlaceSearchInput.styles.ts` — 섹션 헤더, 배지 스타일
- `apps/admin/src/components/ShowInfoFormContent/types.ts` — `ShowBasicInfoFormInputs`에 `concertHallId?: number`
- `apps/admin/src/components/ShowInfoFormContent/ShowBasicInfoFormContent.tsx` — `onSelect`/`onClear`에서 `concertHallId` 처리
- `apps/admin/src/pages/ShowAddPage/index.tsx` — mutation body에 `concertHallId` 매핑
- `apps/admin/src/pages/ShowInfoPage/index.tsx` — mutation body에 `concertHallId` 매핑, 초기값 로드 시 적용

**삭제**
- `apps/admin/src/hooks/useKakaoLocalSearch.ts` — `useVenueSearch`로 완전 대체

---

## Task 1: 백엔드 응답 타입 정의

**Files:**
- Create: `packages/api/src/types/concertHall.ts`
- Modify: `packages/api/src/types/index.ts`

- [ ] **Step 1: 타입 파일 생성**

Create `packages/api/src/types/concertHall.ts`:

```ts
export interface ConcertHallItem {
  id: number;
  name: string;
  address: string;
  isVisible: boolean;
}

export interface WebHostConcertHallListResponse {
  items: ConcertHallItem[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

export interface ConcertHallLocation {
  streetAddress?: string;
  detailAddress?: string;
  latitude?: number;
  longitude?: number;
}

export interface ConcertHallProfileHead {
  rentalFeeSummary?: string;
  location?: ConcertHallLocation;
}

export interface ConcertHallProfileResponse {
  id: number;
  name: string;
  shareCode?: string;
  representativeImageUrl?: string;
  head?: ConcertHallProfileHead;
  informationUpdatedAt?: string;
}
```

- [ ] **Step 2: types/index.ts에 re-export 추가**

Edit `packages/api/src/types/index.ts`. 기존 export 라인 직후에 추가:

```ts
export * from './concertHall';
```

- [ ] **Step 3: 타입 체크**

Run: `yarn workspace @boolti/api type-check`
Expected: 에러 없음 (또는 기존 누락된 모듈 에러만 — `concertHall` 관련 에러는 0)

- [ ] **Step 4: Commit**

```bash
git add packages/api/src/types/concertHall.ts packages/api/src/types/index.ts
git commit -m "feat(api): 공연장(ConcertHall) 응답 타입 정의 추가"
```

---

## Task 2: ShowCreateRequest, PutShowInfoRequest에 concertHallId 추가

**Files:**
- Modify: `packages/api/src/types/show.ts:317-371` (ShowCreateRequest), `:373-410` (NonTicketingShowCreateRequest)
- Modify: `packages/api/src/mutations/useEditShowInfo.ts:5-40` (PutShowInfoRequest)

- [ ] **Step 1: ShowCreateRequest에 concertHallId 추가**

In `packages/api/src/types/show.ts`, `ShowCreateRequest` 인터페이스의 `longitude?: number;` 바로 다음에 추가:

```ts
  /** 위도 */
  latitude?: number;
  /** 경도 */
  longitude?: number;
  /** 선택한 공연장 ID. 값이 있으면 Show 장소 정보는 유지하고 공연장 연결만 생성한다. */
  concertHallId?: number;
  /** 사전 질문 목록. optional. 최대 3개 */
  preQuestions?: {
```

- [ ] **Step 2: NonTicketingShowCreateRequest에도 동일 필드 추가**

In `packages/api/src/types/show.ts`, `NonTicketingShowCreateRequest`에서 `longitude?: number;` 다음 줄에 동일 필드 추가:

```ts
  /** 선택한 공연장 ID. 값이 있으면 Show 장소 정보는 유지하고 공연장 연결만 생성한다. */
  concertHallId?: number;
```

(찾기 어려우면 `longitude?: number;`의 두 번째 출현 위치)

- [ ] **Step 3: PutShowInfoRequest에 concertHallId 추가**

In `packages/api/src/mutations/useEditShowInfo.ts`, `PutShowInfoRequest`의 `longitude?: number;` 직후에 추가:

```ts
  latitude?: number;
  longitude?: number;
  /** 선택한 공연장 ID. 값이 있으면 Show 장소 정보는 유지하고 공연장 연결만 갱신한다. */
  concertHallId?: number;
  notice: string;
```

- [ ] **Step 4: 타입 체크**

Run: `yarn workspace @boolti/api type-check`
Expected: 에러 없음

- [ ] **Step 5: Commit**

```bash
git add packages/api/src/types/show.ts packages/api/src/mutations/useEditShowInfo.ts
git commit -m "feat(api): ShowCreateRequest/PutShowInfoRequest에 concertHallId 필드 추가"
```

---

## Task 3: queryKey에 concertHall 네임스페이스 추가

**Files:**
- Modify: `packages/api/src/queryKey.ts`

- [ ] **Step 1: import에 concertHall 타입 추가**

In `packages/api/src/queryKey.ts`, 기존 `from './types';` import 블록의 뒤에 추가 (line 73 이전):

```ts
import {
  ConcertHallProfileResponse,
  WebHostConcertHallListResponse,
} from './types/concertHall';
```

- [ ] **Step 2: concertHallQueryKeys 추가**

In `packages/api/src/queryKey.ts`, `popupQueryKeys` 다음(line 489 부근)에 추가:

```ts
export const concertHallQueryKeys = createQueryKeys('concertHall', {
  searchByKeyword: (keyword: string) => ({
    queryKey: [keyword],
    queryFn: () =>
      fetcher.get<WebHostConcertHallListResponse>(`web/v1/host/concert-halls`, {
        searchParams: { keyword, page: 0, size: 5 },
      }),
  }),
  profile: (concertHallId: number) => ({
    queryKey: [concertHallId],
    queryFn: () =>
      fetcher.get<ConcertHallProfileResponse>(`web/papi/v1/concert-halls/${concertHallId}`),
  }),
});
```

- [ ] **Step 3: mergeQueryKeys에 추가**

In `packages/api/src/queryKey.ts`, 마지막 `mergeQueryKeys(...)` 호출에 `concertHallQueryKeys` 추가:

```ts
export const queryKeys = mergeQueryKeys(
  adminShowQueryKeys,
  adminEntranceQueryKeys,
  adminReservationQueryKeys,
  adminTicketQueryKeys,
  showQueryKeys,
  userQueryKeys,
  entranceQueryKeys,
  giftQueryKeys,
  hostQueryKeys,
  castTeamQueryKeys,
  popupQueryKeys,
  preQuestionQueryKeys,
  superAdminUserQueryKeys,
  concertHallQueryKeys,
);
```

- [ ] **Step 4: 타입 체크**

Run: `yarn workspace @boolti/api type-check`
Expected: 에러 없음

- [ ] **Step 5: Commit**

```bash
git add packages/api/src/queryKey.ts
git commit -m "feat(api): concertHall queryKey 네임스페이스 추가"
```

---

## Task 4: useConcertHallSearch 훅

**Files:**
- Create: `packages/api/src/queries/useConcertHallSearch.ts`
- Modify: `packages/api/src/queries/index.ts`

- [ ] **Step 1: 훅 파일 생성**

Create `packages/api/src/queries/useConcertHallSearch.ts`:

```ts
import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useConcertHallSearch = (keyword: string) =>
  useQuery({
    ...queryKeys.concertHall.searchByKeyword(keyword),
    enabled: keyword.trim().length > 0,
    staleTime: 60_000,
  });

export default useConcertHallSearch;
```

- [ ] **Step 2: queries/index.ts에 export 추가**

In `packages/api/src/queries/index.ts`:
1. import 섹션 끝에 추가:
   ```ts
   import useConcertHallSearch from './useConcertHallSearch';
   ```
2. export 객체에 추가:
   ```ts
     useSuperAdminHostList,
     useConcertHallSearch,
   };
   ```

- [ ] **Step 3: 타입 체크**

Run: `yarn workspace @boolti/api type-check`
Expected: 에러 없음

- [ ] **Step 4: Commit**

```bash
git add packages/api/src/queries/useConcertHallSearch.ts packages/api/src/queries/index.ts
git commit -m "feat(api): useConcertHallSearch 훅 추가"
```

---

## Task 5: useConcertHallProfile 훅

**Files:**
- Create: `packages/api/src/queries/useConcertHallProfile.ts`
- Modify: `packages/api/src/queries/index.ts`

- [ ] **Step 1: 훅 파일 생성**

Create `packages/api/src/queries/useConcertHallProfile.ts`:

```ts
import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useConcertHallProfile = (concertHallId: number | null) =>
  useQuery({
    ...queryKeys.concertHall.profile(concertHallId ?? 0),
    enabled: concertHallId != null,
  });

export default useConcertHallProfile;
```

- [ ] **Step 2: queries/index.ts에 export 추가**

In `packages/api/src/queries/index.ts`:
1. import 섹션에 추가:
   ```ts
   import useConcertHallProfile from './useConcertHallProfile';
   ```
2. export 객체에 추가:
   ```ts
     useConcertHallSearch,
     useConcertHallProfile,
   };
   ```

- [ ] **Step 3: 타입 체크**

Run: `yarn workspace @boolti/api type-check`
Expected: 에러 없음

- [ ] **Step 4: Commit**

```bash
git add packages/api/src/queries/useConcertHallProfile.ts packages/api/src/queries/index.ts
git commit -m "feat(api): useConcertHallProfile 훅 추가"
```

---

## Task 6: useVenueSearch 통합 훅 (TDD)

**Files:**
- Create: `apps/admin/src/hooks/useVenueSearch.test.ts`
- Create: `apps/admin/src/hooks/useVenueSearch.ts`

이 task는 TDD로 진행: 테스트를 먼저 작성해서 실패시키고, 통합 훅을 구현한다.

### 사전 준비

- [ ] **Step 1: 테스트 환경 확인**

Run: `yarn workspace admin vitest --version`
Expected: vitest 버전 출력. 안 나오면 `yarn install` 한 번 실행.

### 테스트 작성

- [ ] **Step 2: 실패 테스트 작성**

Create `apps/admin/src/hooks/useVenueSearch.test.ts`:

```ts
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import React from 'react';

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

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useVenueSearch', () => {
  it('빈 쿼리이면 API 호출하지 않고 빈 결과 반환', async () => {
    const { result } = renderHook(() => useVenueSearch(), { wrapper });
    expect(result.current.results).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it('검색어 입력 후 디바운싱 거쳐 세 소스 결과 머지', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const { result } = renderHook(() => useVenueSearch(), { wrapper });

    act(() => {
      result.current.setQuery('롤링홀');
    });

    act(() => {
      vi.advanceTimersByTime(350);
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
    vi.useRealTimers();
  });

  it('한 소스가 실패해도 나머지 결과는 표시', async () => {
    server.use(
      http.get('*/web/v1/host/concert-halls', () =>
        HttpResponse.json({ message: 'server error' }, { status: 500 }),
      ),
    );

    vi.useFakeTimers({ shouldAdvanceTime: true });
    const { result } = renderHook(() => useVenueSearch(), { wrapper });

    act(() => {
      result.current.setQuery('롤링홀');
    });

    act(() => {
      vi.advanceTimersByTime(350);
    });

    await waitFor(
      () => {
        const hasKakao = result.current.results.some((r) => r.source.startsWith('kakao'));
        expect(hasKakao).toBe(true);
      },
      { timeout: 3000 },
    );

    expect(result.current.errors?.boolti).toBeTruthy();
    vi.useRealTimers();
  });
});
```

- [ ] **Step 3: 테스트가 실패하는 것 확인**

Run: `yarn workspace admin vitest run src/hooks/useVenueSearch.test.ts`
Expected: FAIL (`Cannot find module './useVenueSearch'`)

### 구현

- [ ] **Step 4: useVenueSearch 훅 구현**

Create `apps/admin/src/hooks/useVenueSearch.ts`:

```ts
import { useCallback, useEffect, useRef, useState } from 'react';

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const KAKAO_LOCAL_KEYWORD_URL = 'https://dapi.kakao.com/v2/local/search/keyword.json';
const KAKAO_LOCAL_ADDRESS_URL = 'https://dapi.kakao.com/v2/local/search/address.json';
const BOOLTI_API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

const DEBOUNCE_MS = 300;
const KAKAO_PAGE_SIZE = 5;
const BOOLTI_PAGE_SIZE = 5;

interface KakaoKeywordDoc {
  id: string;
  place_name: string;
  category_group_name: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
}

interface KakaoAddressDoc {
  address_name: string;
  x: string;
  y: string;
  address: { address_name: string } | null;
  road_address: { address_name: string } | null;
}

interface ConcertHallItem {
  id: number;
  name: string;
  address: string;
  isVisible: boolean;
}

interface WebHostConcertHallListResponse {
  items: ConcertHallItem[];
}

export type VenueSource = 'boolti' | 'kakao_place' | 'kakao_address';

export type VenueResult =
  | {
      source: 'boolti';
      concertHallId: number;
      name: string;
      address: string;
    }
  | {
      source: 'kakao_place';
      placeName: string;
      addressName: string;
      roadAddressName: string;
      category: string;
      x: string;
      y: string;
    }
  | {
      source: 'kakao_address';
      addressName: string;
      roadAddressName: string;
      x: string;
      y: string;
    };

const fetchBoolti = async (keyword: string, signal: AbortSignal): Promise<VenueResult[]> => {
  const url = new URL('web/v1/host/concert-halls', BOOLTI_API_BASE);
  url.searchParams.set('keyword', keyword);
  url.searchParams.set('page', '0');
  url.searchParams.set('size', String(BOOLTI_PAGE_SIZE));

  const token = window.localStorage.getItem('boolti-web@accessToken');
  const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

  const res = await fetch(url.toString(), { headers, signal });
  if (!res.ok) throw new Error(`boolti ${res.status}`);
  const data: WebHostConcertHallListResponse = await res.json();
  return data.items.map((item) => ({
    source: 'boolti' as const,
    concertHallId: item.id,
    name: item.name,
    address: item.address,
  }));
};

const fetchKakaoKeyword = async (keyword: string, signal: AbortSignal): Promise<VenueResult[]> => {
  const url = new URL(KAKAO_LOCAL_KEYWORD_URL);
  url.searchParams.set('query', keyword);
  url.searchParams.set('size', String(KAKAO_PAGE_SIZE));

  const res = await fetch(url.toString(), {
    headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` },
    signal,
  });
  if (!res.ok) throw new Error(`kakao_place ${res.status}`);
  const data = (await res.json()) as { documents: KakaoKeywordDoc[] };
  return data.documents.map((doc) => ({
    source: 'kakao_place' as const,
    placeName: doc.place_name,
    category: doc.category_group_name,
    addressName: doc.address_name,
    roadAddressName: doc.road_address_name,
    x: doc.x,
    y: doc.y,
  }));
};

const fetchKakaoAddress = async (keyword: string, signal: AbortSignal): Promise<VenueResult[]> => {
  const url = new URL(KAKAO_LOCAL_ADDRESS_URL);
  url.searchParams.set('query', keyword);
  url.searchParams.set('size', String(KAKAO_PAGE_SIZE));

  const res = await fetch(url.toString(), {
    headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` },
    signal,
  });
  if (!res.ok) throw new Error(`kakao_address ${res.status}`);
  const data = (await res.json()) as { documents: KakaoAddressDoc[] };
  return data.documents.map((doc) => ({
    source: 'kakao_address' as const,
    addressName: doc.address?.address_name ?? doc.address_name,
    roadAddressName: doc.road_address?.address_name ?? doc.address_name,
    x: doc.x,
    y: doc.y,
  }));
};

const normalizeName = (name: string) => name.trim().toLowerCase();

const merge = (
  boolti: VenueResult[],
  kakaoPlace: VenueResult[],
  kakaoAddress: VenueResult[],
): VenueResult[] => {
  const booltiNames = new Set(
    boolti
      .filter((r): r is Extract<VenueResult, { source: 'boolti' }> => r.source === 'boolti')
      .map((r) => normalizeName(r.name)),
  );
  const filteredKakaoPlace = kakaoPlace.filter(
    (r) => r.source === 'kakao_place' && !booltiNames.has(normalizeName(r.placeName)),
  );
  return [...boolti, ...filteredKakaoPlace, ...kakaoAddress];
};

const useVenueSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<VenueResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<VenueSource, Error>>>({});
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const search = useCallback(async (keyword: string) => {
    if (!keyword.trim()) {
      setResults([]);
      setIsLoading(false);
      setErrors({});
      return;
    }

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    setErrors({});

    const settled = await Promise.allSettled([
      fetchBoolti(keyword, controller.signal),
      fetchKakaoKeyword(keyword, controller.signal),
      fetchKakaoAddress(keyword, controller.signal),
    ]);

    if (controller.signal.aborted) return;

    const nextErrors: Partial<Record<VenueSource, Error>> = {};
    const sourceMap: VenueSource[] = ['boolti', 'kakao_place', 'kakao_address'];
    const sourceResults: VenueResult[][] = settled.map((s, i) => {
      if (s.status === 'fulfilled') return s.value;
      nextErrors[sourceMap[i]] = s.reason instanceof Error ? s.reason : new Error(String(s.reason));
      return [];
    });

    setResults(merge(sourceResults[0], sourceResults[1], sourceResults[2]));
    setErrors(nextErrors);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      void search(query);
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, search]);

  const clearResults = useCallback(() => {
    setResults([]);
    setQuery('');
    setErrors({});
  }, []);

  return { query, setQuery, clearResults, results, isLoading, errors };
};

export default useVenueSearch;
```

- [ ] **Step 5: 테스트 통과 확인**

Run: `yarn workspace admin vitest run src/hooks/useVenueSearch.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 6: Commit**

```bash
git add apps/admin/src/hooks/useVenueSearch.ts apps/admin/src/hooks/useVenueSearch.test.ts
git commit -m "feat(admin): useVenueSearch 통합 검색 훅 추가 (불티 + 카카오)"
```

---

## Task 7: PlaceSearchInput 스타일 (섹션 헤더 + 배지)

**Files:**
- Modify: `apps/admin/src/components/PlaceSearchInput/PlaceSearchInput.styles.ts`

- [ ] **Step 1: 스타일 추가**

In `apps/admin/src/components/PlaceSearchInput/PlaceSearchInput.styles.ts`, `EmptyState` 정의 다음(line 142 부근), default export 객체 이전에 추가:

```ts
const SectionHeader = styled.li`
  padding: 8px 16px;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g50};
  background: ${({ theme }) => theme.palette.grey.g00};
  list-style: none;
`;

const BooltiBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${({ theme }) => theme.palette.grey.g90};
  color: ${({ theme }) => theme.palette.grey.w};
  ${({ theme }) => theme.typo.b1};
  font-size: 11px;
  line-height: 1;
  margin-left: auto;
`;
```

그리고 default export 객체에 두 스타일 추가:

```ts
export default {
  Container,
  InputWrapper,
  SearchInput,
  SearchIconWrapper,
  Dropdown,
  DropdownItem,
  PlaceNameRow,
  PlaceName,
  Category,
  AddressName,
  SelectedInfo,
  ErrorMessage,
  EmptyState,
  SectionHeader,
  BooltiBadge,
};
```

- [ ] **Step 2: Commit**

```bash
git add apps/admin/src/components/PlaceSearchInput/PlaceSearchInput.styles.ts
git commit -m "feat(admin): PlaceSearchInput에 섹션 헤더/불티 배지 스타일 추가"
```

---

## Task 8: PlaceSearchInput 본체 변경 (TDD)

**Files:**
- Create: `apps/admin/src/components/PlaceSearchInput/PlaceSearchInput.test.tsx`
- Modify: `apps/admin/src/components/PlaceSearchInput/index.tsx`

### 테스트 작성

- [ ] **Step 1: 컴포넌트 테스트 작성**

Create `apps/admin/src/components/PlaceSearchInput/PlaceSearchInput.test.tsx`:

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@boolti/ui';
import { describe, expect, it, vi } from 'vitest';
import React from 'react';

import PlaceSearchInput from './index';
import * as useVenueSearchModule from '~/hooks/useVenueSearch';
import * as apiModule from '@boolti/api';

vi.mock('~/hooks/useVenueSearch');

const renderWith = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </QueryClientProvider>,
  );
};

describe('PlaceSearchInput', () => {
  it('불티 검색 결과를 "불티 등록 공연장" 섹션 헤더 아래에 배지와 함께 표시', async () => {
    vi.spyOn(useVenueSearchModule, 'default').mockReturnValue({
      query: '롤링홀',
      setQuery: vi.fn(),
      clearResults: vi.fn(),
      results: [
        {
          source: 'boolti',
          concertHallId: 1,
          name: '롤링홀',
          address: '서울 마포구 와우산로 21길 19',
        },
        {
          source: 'kakao_place',
          placeName: '클럽 FF',
          category: '문화시설',
          addressName: '서울 마포구',
          roadAddressName: '서울 마포구 와우산로 13길 25',
          x: '126.92',
          y: '37.55',
        },
      ],
      isLoading: false,
      errors: {},
    } as ReturnType<typeof useVenueSearchModule.default>);

    renderWith(<PlaceSearchInput onSelect={vi.fn()} />);
    await userEvent.click(screen.getByPlaceholderText(/공연장명 또는 도로명 주소/));
    expect(screen.getByText('불티 등록 공연장')).toBeInTheDocument();
    expect(screen.getByText('외부 검색 결과')).toBeInTheDocument();
    expect(screen.getByText('불티 등록')).toBeInTheDocument();
  });

  it('불티 결과 클릭 시 getProfile 호출 후 onSelect에 concertHallId 포함', async () => {
    vi.spyOn(useVenueSearchModule, 'default').mockReturnValue({
      query: '롤링홀',
      setQuery: vi.fn(),
      clearResults: vi.fn(),
      results: [
        { source: 'boolti', concertHallId: 1, name: '롤링홀', address: '서울 마포구 와우산로 21길 19' },
      ],
      isLoading: false,
      errors: {},
    } as ReturnType<typeof useVenueSearchModule.default>);

    vi.spyOn(apiModule, 'useConcertHallProfile').mockReturnValue({
      data: {
        id: 1,
        name: '롤링홀',
        head: {
          location: {
            streetAddress: '서울 마포구 와우산로 21길 19',
            detailAddress: '지하 1층',
            latitude: 37.55,
            longitude: 126.923,
          },
        },
      },
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof apiModule.useConcertHallProfile>);

    const handleSelect = vi.fn();
    renderWith(<PlaceSearchInput onSelect={handleSelect} />);
    await userEvent.click(screen.getByPlaceholderText(/공연장명 또는 도로명 주소/));
    await userEvent.click(screen.getByText('롤링홀'));

    await waitFor(() => {
      expect(handleSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'boolti',
          concertHallId: 1,
          placeName: '롤링홀',
          streetAddress: '서울 마포구 와우산로 21길 19',
          detailAddress: '지하 1층',
          latitude: 37.55,
          longitude: 126.923,
        }),
      );
    });
  });

  it('카카오 address 결과 선택 시 상세 주소 입력 활성', async () => {
    vi.spyOn(useVenueSearchModule, 'default').mockReturnValue({
      query: '와우산로',
      setQuery: vi.fn(),
      clearResults: vi.fn(),
      results: [
        {
          source: 'kakao_address',
          addressName: '서울 마포구 와우산로 18길 20',
          roadAddressName: '서울 마포구 와우산로 18길 20',
          x: '126.92',
          y: '37.55',
        },
      ],
      isLoading: false,
      errors: {},
    } as ReturnType<typeof useVenueSearchModule.default>);

    const handleSelect = vi.fn();
    renderWith(<PlaceSearchInput onSelect={handleSelect} />);
    await userEvent.click(screen.getByPlaceholderText(/공연장명 또는 도로명 주소/));
    await userEvent.click(screen.getByText(/서울 마포구 와우산로 18길 20/));

    const detailInput = await screen.findByPlaceholderText('상세 주소를 입력해 주세요');
    expect(detailInput).not.toBeDisabled();
    expect(handleSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'kakao_address',
        concertHallId: undefined,
      }),
    );
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `yarn workspace admin vitest run src/components/PlaceSearchInput/PlaceSearchInput.test.tsx`
Expected: FAIL (구현이 아직 변경 안 됨 — 섹션 헤더/배지 없음)

### 구현

- [ ] **Step 3: PlaceSearchInput 본체 재작성**

Replace entire contents of `apps/admin/src/components/PlaceSearchInput/index.tsx`:

```tsx
import { useConcertHallProfile } from '@boolti/api';
import { SearchIcon } from '@boolti/icon';
import { TextField } from '@boolti/ui';
import { useEffect, useRef, useState } from 'react';

import useVenueSearch, { VenueResult } from '~/hooks/useVenueSearch';

import Styled from './PlaceSearchInput.styles';

export type PlaceSelectType = 'boolti' | 'kakao_place' | 'kakao_address';

export interface PlaceSelectResult {
  type: PlaceSelectType;
  concertHallId?: number;
  placeName: string;
  streetAddress: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
}

interface PlaceSearchInputProps {
  initialPlaceName?: string;
  initialAddress?: string;
  initialDetailAddress?: string;
  initialConcertHallId?: number;
  disabled?: boolean;
  errorMessage?: string;
  onSelect: (result: PlaceSelectResult) => void;
  onClear?: () => void;
  onDetailAddressChange?: (value: string) => void;
}

interface SelectedSnapshot {
  type: PlaceSelectType;
  placeName: string;
  streetAddress: string;
}

const PlaceSearchInput = ({
  initialPlaceName,
  initialAddress,
  initialDetailAddress,
  initialConcertHallId,
  disabled,
  errorMessage,
  onSelect,
  onClear,
  onDetailAddressChange,
}: PlaceSearchInputProps) => {
  const { query, setQuery, results, isLoading, clearResults } = useVenueSearch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<SelectedSnapshot | null>(null);
  const [detailAddress, setDetailAddress] = useState(initialDetailAddress ?? '');
  const [pendingBooltiId, setPendingBooltiId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const detailAddressInputRef = useRef<HTMLInputElement>(null);

  const profileQuery = useConcertHallProfile(pendingBooltiId);

  useEffect(() => {
    if (!selected && initialAddress) {
      const type: PlaceSelectType = initialConcertHallId
        ? 'boolti'
        : initialPlaceName
          ? 'kakao_place'
          : 'kakao_address';
      setSelected({
        type,
        placeName: initialPlaceName ?? '',
        streetAddress: initialAddress,
      });
    }
  }, [initialAddress, initialPlaceName, initialConcertHallId, selected]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (pendingBooltiId == null) return;
    if (profileQuery.isLoading) return;

    const booltiResult = results.find(
      (r): r is Extract<VenueResult, { source: 'boolti' }> =>
        r.source === 'boolti' && r.concertHallId === pendingBooltiId,
    );
    if (!booltiResult) {
      setPendingBooltiId(null);
      return;
    }

    if (profileQuery.isError) {
      // eslint-disable-next-line no-console
      console.warn('[PlaceSearchInput] concert hall profile fetch failed', profileQuery.error);
    }

    const location = profileQuery.data?.head?.location;
    const streetAddress = location?.streetAddress || booltiResult.address;
    const detailAddr = location?.detailAddress ?? '';

    setSelected({
      type: 'boolti',
      placeName: booltiResult.name,
      streetAddress,
    });
    setDetailAddress(detailAddr);
    setQuery(booltiResult.name);
    setIsDropdownOpen(false);
    clearResults();

    onSelect({
      type: 'boolti',
      concertHallId: booltiResult.concertHallId,
      placeName: booltiResult.name,
      streetAddress,
      detailAddress: detailAddr,
      latitude: location?.latitude ?? 0,
      longitude: location?.longitude ?? 0,
    });

    setPendingBooltiId(null);
  }, [
    pendingBooltiId,
    profileQuery.isLoading,
    profileQuery.isError,
    profileQuery.error,
    profileQuery.data,
    results,
    onSelect,
    setQuery,
    clearResults,
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsDropdownOpen(true);
    if (selected) {
      setSelected(null);
      setDetailAddress('');
      onClear?.();
    }
  };

  const handleSelectBoolti = (concertHallId: number) => {
    setPendingBooltiId(concertHallId);
  };

  const handleSelectKakaoPlace = (
    result: Extract<VenueResult, { source: 'kakao_place' }>,
  ) => {
    const street = result.roadAddressName || result.addressName;
    setSelected({ type: 'kakao_place', placeName: result.placeName, streetAddress: street });
    setDetailAddress('');
    setQuery(result.placeName);
    setIsDropdownOpen(false);
    clearResults();
    onSelect({
      type: 'kakao_place',
      placeName: result.placeName,
      streetAddress: street,
      detailAddress: '',
      latitude: Number(result.y),
      longitude: Number(result.x),
    });
  };

  const handleSelectKakaoAddress = (
    result: Extract<VenueResult, { source: 'kakao_address' }>,
  ) => {
    const street = result.roadAddressName || result.addressName;
    setSelected({ type: 'kakao_address', placeName: '', streetAddress: street });
    setDetailAddress('');
    setQuery(street);
    setIsDropdownOpen(false);
    clearResults();
    onSelect({
      type: 'kakao_address',
      placeName: '',
      streetAddress: street,
      detailAddress: '',
      latitude: Number(result.y),
      longitude: Number(result.x),
    });
    setTimeout(() => detailAddressInputRef.current?.focus(), 0);
  };

  const handleDetailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDetailAddress(value);
    onDetailAddressChange?.(value);
  };

  const handleInputFocus = () => {
    if (!selected && query.trim()) setIsDropdownOpen(true);
  };

  const booltiResults = results.filter(
    (r): r is Extract<VenueResult, { source: 'boolti' }> => r.source === 'boolti',
  );
  const kakaoPlaceResults = results.filter(
    (r): r is Extract<VenueResult, { source: 'kakao_place' }> => r.source === 'kakao_place',
  );
  const kakaoAddressResults = results.filter(
    (r): r is Extract<VenueResult, { source: 'kakao_address' }> => r.source === 'kakao_address',
  );

  const showDropdown = isDropdownOpen && query.trim() && !selected;

  return (
    <div>
      <Styled.Container ref={containerRef}>
        <Styled.InputWrapper>
          <Styled.SearchInput
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder="공연장명 또는 도로명 주소를 입력해 주세요"
            disabled={disabled}
            hasError={!!errorMessage && !selected}
          />
          <Styled.SearchIconWrapper>
            <SearchIcon />
          </Styled.SearchIconWrapper>
        </Styled.InputWrapper>

        {showDropdown && (
          <Styled.Dropdown>
            {isLoading && results.length === 0 ? (
              <Styled.EmptyState>검색 중...</Styled.EmptyState>
            ) : results.length === 0 ? (
              <Styled.EmptyState>검색 결과가 없어요</Styled.EmptyState>
            ) : (
              <>
                {booltiResults.length > 0 && (
                  <>
                    <Styled.SectionHeader>불티 등록 공연장</Styled.SectionHeader>
                    {booltiResults.map((r) => (
                      <Styled.DropdownItem
                        key={`boolti-${r.concertHallId}`}
                        onClick={() => handleSelectBoolti(r.concertHallId)}
                      >
                        <Styled.PlaceNameRow>
                          <Styled.PlaceName>{r.name}</Styled.PlaceName>
                          <Styled.BooltiBadge>불티 등록</Styled.BooltiBadge>
                        </Styled.PlaceNameRow>
                        <Styled.AddressName>{r.address}</Styled.AddressName>
                      </Styled.DropdownItem>
                    ))}
                  </>
                )}
                {(kakaoPlaceResults.length > 0 || kakaoAddressResults.length > 0) && (
                  <>
                    <Styled.SectionHeader>외부 검색 결과</Styled.SectionHeader>
                    {kakaoPlaceResults.map((r, i) => (
                      <Styled.DropdownItem
                        key={`kp-${i}-${r.x}-${r.y}`}
                        onClick={() => handleSelectKakaoPlace(r)}
                      >
                        <Styled.PlaceNameRow>
                          <Styled.PlaceName>{r.placeName}</Styled.PlaceName>
                          {r.category && <Styled.Category>{r.category}</Styled.Category>}
                        </Styled.PlaceNameRow>
                        <Styled.AddressName>
                          {r.roadAddressName || r.addressName}
                        </Styled.AddressName>
                      </Styled.DropdownItem>
                    ))}
                    {kakaoAddressResults.map((r, i) => (
                      <Styled.DropdownItem
                        key={`ka-${i}-${r.x}-${r.y}`}
                        onClick={() => handleSelectKakaoAddress(r)}
                      >
                        <Styled.PlaceNameRow>
                          <Styled.PlaceName>{r.roadAddressName || r.addressName}</Styled.PlaceName>
                        </Styled.PlaceNameRow>
                      </Styled.DropdownItem>
                    ))}
                  </>
                )}
              </>
            )}
          </Styled.Dropdown>
        )}
      </Styled.Container>

      {selected && (
        <Styled.SelectedInfo>
          {selected.type === 'kakao_address' ? (
            <TextField
              ref={detailAddressInputRef}
              inputType="text"
              size="big"
              value={detailAddress}
              onChange={handleDetailAddressChange}
              placeholder="상세 주소를 입력해 주세요"
              disabled={disabled}
            />
          ) : (
            <TextField
              inputType="text"
              size="big"
              value={
                selected.type === 'boolti' && detailAddress
                  ? `${selected.streetAddress} ${detailAddress}`
                  : selected.streetAddress
              }
              disabled
              placeholder="-"
            />
          )}
        </Styled.SelectedInfo>
      )}

      {errorMessage && !selected && <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>}
    </div>
  );
};

export default PlaceSearchInput;
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `yarn workspace admin vitest run src/components/PlaceSearchInput/PlaceSearchInput.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add apps/admin/src/components/PlaceSearchInput/index.tsx apps/admin/src/components/PlaceSearchInput/PlaceSearchInput.test.tsx
git commit -m "feat(admin): PlaceSearchInput에 불티 공연장 검색 통합 및 자동 연결"
```

---

## Task 9: 폼 타입에 concertHallId 추가

**Files:**
- Modify: `apps/admin/src/components/ShowInfoFormContent/types.ts`

- [ ] **Step 1: ShowBasicInfoFormInputs 확장**

Edit `apps/admin/src/components/ShowInfoFormContent/types.ts`. `ShowBasicInfoFormInputs` 인터페이스의 마지막 필드(`longitude: number;`) 다음에 추가:

```ts
export interface ShowBasicInfoFormInputs {
  name: string;
  date: string;
  startTime: string;
  runningTime: string;
  placeName: string;
  placeStreetAddress: string;
  placeDetailAddress: string;
  latitude: number;
  longitude: number;
  concertHallId?: number;
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/admin/src/components/ShowInfoFormContent/types.ts
git commit -m "feat(admin): ShowBasicInfoFormInputs에 concertHallId 필드 추가"
```

---

## Task 10: ShowBasicInfoFormContent에서 concertHallId 처리

**Files:**
- Modify: `apps/admin/src/components/ShowInfoFormContent/ShowBasicInfoFormContent.tsx:278-313`

- [ ] **Step 1: PlaceSearchInput 호출부 수정**

Edit `apps/admin/src/components/ShowInfoFormContent/ShowBasicInfoFormContent.tsx`. `<PlaceSearchInput ... />` 블록 전체(line 278-313)를 다음으로 교체:

```tsx
            <PlaceSearchInput
              initialPlaceName={watch('placeName')}
              initialAddress={watch('placeStreetAddress')}
              initialDetailAddress={watch('placeDetailAddress')}
              initialConcertHallId={watch('concertHallId')}
              disabled={disabled}
              errorMessage={
                errors.placeName?.message ??
                errors.placeStreetAddress?.message
              }
              onSelect={(result) => {
                setValue('placeName', result.placeName || result.streetAddress, {
                  shouldValidate: true,
                });
                setValue('placeStreetAddress', result.streetAddress, {
                  shouldValidate: true,
                });
                setValue('placeDetailAddress', result.detailAddress);
                setValue('latitude', result.latitude, { shouldValidate: true });
                setValue('longitude', result.longitude, { shouldValidate: true });
                setValue('concertHallId', result.concertHallId);
                clearErrors(['placeName', 'placeStreetAddress', 'placeDetailAddress']);
              }}
              onClear={() => {
                setValue('placeName', '');
                setValue('placeStreetAddress', '');
                setValue('placeDetailAddress', '');
                setValue('latitude', 0);
                setValue('longitude', 0);
                setValue('concertHallId', undefined);
                setError('placeStreetAddress', {
                  type: 'required',
                  message: VENUE_REQUIRED_MESSAGE,
                });
              }}
              onDetailAddressChange={(value) => {
                setValue('placeDetailAddress', value);
              }}
            />
```

- [ ] **Step 2: 타입 체크**

Run: `yarn workspace admin type-check`
Expected: `ShowBasicInfoFormContent.tsx` 관련 에러 없음 (vitest/msw 미설치 같은 기존 환경 에러는 무시)

- [ ] **Step 3: Commit**

```bash
git add apps/admin/src/components/ShowInfoFormContent/ShowBasicInfoFormContent.tsx
git commit -m "feat(admin): ShowBasicInfoFormContent에서 concertHallId 폼 통합"
```

---

## Task 11: 공연 등록(ShowAddPage)에서 concertHallId 매핑

**Files:**
- Modify: `apps/admin/src/pages/ShowAddPage/index.tsx:106-112` (place 매핑 부분)

- [ ] **Step 1: ShowAddPage에서 mutation body에 concertHallId 포함**

Edit `apps/admin/src/pages/ShowAddPage/index.tsx`. `latitude: showBasicInfoForm.getValues('latitude'),` 라인 부근(line 106)을 찾아 그 뒤에 `concertHallId` 추가:

```tsx
      latitude: showBasicInfoForm.getValues('latitude'),
      longitude: showBasicInfoForm.getValues('longitude'),
      concertHallId: showBasicInfoForm.getValues('concertHallId'),
      place: {
        name: showBasicInfoForm.getValues('placeName'),
        streetAddress: showBasicInfoForm.getValues('placeStreetAddress'),
        detailAddress: showBasicInfoForm.getValues('placeDetailAddress'),
      },
```

- [ ] **Step 2: 타입 체크**

Run: `yarn workspace admin type-check`
Expected: 관련 에러 없음

- [ ] **Step 3: Commit**

```bash
git add apps/admin/src/pages/ShowAddPage/index.tsx
git commit -m "feat(admin): 공연 생성 시 concertHallId payload 전달"
```

---

## Task 12: 공연 수정(ShowInfoPage)에서 concertHallId 매핑 + 초기값 로드

**Files:**
- Modify: `apps/admin/src/pages/ShowInfoPage/index.tsx:118-150` (mutation body), `:205-215` (초기값 reset)

- [ ] **Step 1: mutation body에 concertHallId 추가**

Edit `apps/admin/src/pages/ShowInfoPage/index.tsx`. `editShowInfoMutation.mutateAsync(...)` 호출의 body 객체에서 `latitude`, `longitude` 다음(line 128-129 부근)에 추가:

```tsx
          latitude: showBasicInfoForm.getValues('latitude'),
          longitude: showBasicInfoForm.getValues('longitude'),
          concertHallId: showBasicInfoForm.getValues('concertHallId'),
          place: {
            name: showBasicInfoFormInputs.placeName,
            streetAddress: showBasicInfoFormInputs.placeStreetAddress,
            detailAddress: showBasicInfoFormInputs.placeDetailAddress,
          },
```

- [ ] **Step 2: 폼 초기값에 concertHallId 추가**

같은 파일에서 `placeName: show.place.name,` 라인 부근(line 208)을 찾아 `longitude` 다음에 추가:

```tsx
      placeName: show.place.name,
      placeStreetAddress: show.place.streetAddress,
      placeDetailAddress: show.place.detailAddress,
      latitude: show.latitude,
      longitude: show.longitude,
      concertHallId: show.concertHallId,
```

`show.concertHallId`가 타입 에러를 내면 Step 3에서 `ShowResponse` 타입 확장 필요.

- [ ] **Step 3: ShowResponse 타입 확장 (필요 시)**

Run: `yarn workspace admin type-check`

만약 `Property 'concertHallId' does not exist on type 'ShowResponse'` 에러가 나면:

Edit `packages/api/src/types/show.ts`. `ShowResponse` 인터페이스에 (이름으로 grep 후 위치 찾기) 다음 필드 추가:

```ts
  /** 연결된 불티 공연장 ID. 없으면 null/undefined */
  concertHallId?: number;
```

에러가 안 나면 이 step은 skip.

- [ ] **Step 4: 타입 체크 재실행**

Run: `yarn workspace admin type-check`
Expected: 관련 에러 없음

- [ ] **Step 5: Commit**

```bash
git add apps/admin/src/pages/ShowInfoPage/index.tsx packages/api/src/types/show.ts
git commit -m "feat(admin): 공연 수정 시 concertHallId 로드 및 payload 전달"
```

---

## Task 13: useKakaoLocalSearch 제거

**Files:**
- Delete: `apps/admin/src/hooks/useKakaoLocalSearch.ts`

- [ ] **Step 1: 잔존 참조 확인**

Run: `grep -rn "useKakaoLocalSearch" apps packages 2>/dev/null`
Expected: 출력 없음 (이미 `useVenueSearch`로 대체됨)

- [ ] **Step 2: 파일 삭제**

```bash
rm apps/admin/src/hooks/useKakaoLocalSearch.ts
```

- [ ] **Step 3: 빌드 확인**

Run: `yarn workspace admin build`
Expected: 빌드 성공 (또는 venue 관련 외 기존 에러만)

- [ ] **Step 4: Commit**

```bash
git add -u apps/admin/src/hooks/
git commit -m "chore(admin): useVenueSearch로 대체된 useKakaoLocalSearch 제거"
```

---

## Task 14: 전체 검증

- [ ] **Step 1: 모든 테스트 실행**

Run: `yarn workspace admin vitest run`
Expected: 새로 추가한 테스트 PASS, 기존 테스트도 깨지지 않음

- [ ] **Step 2: 전체 타입 체크**

Run: `yarn type-check`
Expected: 새로 도입된 venue 관련 코드에서 0 에러 (기존 환경 에러는 무시 가능)

- [ ] **Step 3: 린트**

Run: `yarn lint`
Expected: 새로 추가/변경한 파일에 0 에러

- [ ] **Step 4: 수동 확인 (dev 서버)**

```bash
yarn workspace admin dev
```

브라우저에서 공연 등록 페이지로 가서:
1. 공연장 입력칸에 "롤링홀" 입력 → 드롭다운에 "불티 등록 공연장" 섹션 표시 확인
2. 불티 결과 우측에 "불티 등록" 배지 표시 확인
3. 불티 결과 클릭 → 상세 주소가 자동 채워진 disabled 인풋 노출 확인
4. 주소만 검색해서 카카오 address 선택 → 빈 상세 주소 인풋 자동 포커스 확인

스크린샷이나 짧은 로그를 PR 본문에 첨부.

- [ ] **Step 5: 최종 검증 commit (필요 시)**

수정 사항 없으면 skip. 있으면:
```bash
git add -A
git commit -m "fix(admin): 통합 검색 QA 반영"
```

---

## 완료 후

- 브랜치 push 후 develop 대상 PR 생성 권장.
- PR 본문에는 spec 링크(`docs/superpowers/specs/2026-06-09-venue-search-with-boolti-concert-hall-design.md`)와 함께 수동 확인 결과를 적는다.
- 다음 develop → main 머지 시점에 venue/map 기능이 main에 재유입되는 이슈는 [PR #431](https://github.com/Nexters/boolti-web/pull/431)과 별개로 다시 결정 (현재 main에는 이 기능이 없는 상태).

## 스코프 밖

스펙 §8 그대로:
- 페이지네이션 / 더보기 버튼 (첫 페이지만 표시)
- 카카오 결과 위경도 기반 fuzzy match
- 백엔드 통합 검색 API 신설
- 카카오 keyword 호출의 `useQuery` 마이그레이션
