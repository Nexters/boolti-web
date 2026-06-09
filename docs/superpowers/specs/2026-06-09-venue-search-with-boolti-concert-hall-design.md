# 공연장 검색 + 불티 등록 공연장 자동 연결 — 디자인 스펙

- 작성일: 2026-06-09
- 대상 브랜치: `develop` (main에서는 [PR #431](https://github.com/Nexters/boolti-web/pull/431)로 롤백 진행 중)
- 관련 코드: `apps/admin/src/components/PlaceSearchInput/`, `apps/admin/src/hooks/useKakaoLocalSearch.ts`, `apps/admin/src/components/ShowInfoFormContent/ShowBasicInfoFormContent.tsx`
- 관련 Figma: [공연장 선택 — node 9162:59204](https://www.figma.com/design/BGDkTB99yxqkaQrwlCdtU5/Boolti-Vol.2?node-id=9162-59204&m=dev)

## 1. 배경

호스트가 공연을 등록할 때 공연장명/주소로 검색해서 선택할 수 있는 기능은 develop에 이미 구현되어 있다 (카카오 로컬 keyword + address API 병렬 호출). 이번 작업은 그 위에 **"불티에 등록된 공연장 프로필이 있으면 자동 연결하는 기능"**을 추가한다.

### 기획자 요청 검토 결과

| 기획자 요청 | 검토 결론 |
|---|---|
| "공연장명으로 검색 가능하게" | ✅ 이미 됨 (카카오 keyword API) |
| "공연장명인지 주소인지 구분해서 인풋을 다르게 표시" | ✅ 이미 구현됨. `PlaceSearchInput`이 `type === 'place' \| 'address'`로 분기 |
| "공연장명 선택 시 → 상세 주소 자동 입력 (lead-only)" | ✅ 이미 동작 (`PlaceSearchInput/index.tsx:186-208`) |
| "주소 선택 시 → 빈 상세 주소 인풋" | ✅ 이미 동작 |
| "불티 등록 공연장 자동 연결" | ❌ 미구현 — 이번 작업 대상 |

→ 기획자에게 "구분 가능 여부"에 대한 우려는 이미 해소된 상태이며, 핵심 추가 기능은 **불티 공연장 검색 결과 통합과 `concertHallId` 저장**임을 회신.

### 백엔드 준비 상태

| API | 메서드 + 경로 | 비고 |
|---|---|---|
| `searchConcertHalls` | `GET /web/v1/host/concert-halls?keyword=&page=&size=` | "공연 생성 시 선택용 공연장 목록 조회". `WebHostConcertHallListResponse` 반환 |
| `getProfile_1` | `GET /web/papi/v1/concert-halls/{concertHallId}` | 선택 후 위경도(`head.location.{latitude, longitude}`) 확보용 |

또한 `ShowCreateRequest`와 `ShowUpdateRequestV2`에 이미 `concertHallId?: number` 필드가 존재한다. 명세상:
> "선택한 공연장 ID. 값이 있으면 Show 장소 정보는 유지하고 공연장 연결만 생성/갱신한다."

→ 백엔드는 선제적으로 준비를 마쳐놓았으며, 프론트는 검색·선택·저장만 연결하면 된다.

## 2. UX 결정

- **통합 드롭다운**: 불티 공연장 결과와 카카오 검색 결과를 **하나의 드롭다운에서 함께** 표시한다.
- **불티 결과 상단 배치**: 섹션 헤더 "불티 등록 공연장"으로 묶고 그 아래에 "외부 검색 결과" 섹션 (카카오 keyword + address).
- **배지**: 불티 등록 공연장 아이템 우측에 작은 "불티 등록" 배지를 부착한다.
- **선택 후 상세 주소 인풋 동작**:
  - 불티 공연장 → disabled, value = `head.location.streetAddress` (없으면 `ConcertHallItem.address`)
  - 카카오 place → disabled, value = `roadAddressName || addressName` (기존 동작)
  - 카카오 address → 활성 입력 + 자동 포커스 (기존 동작)
- **자동 연결의 의미**: "유저가 드롭다운에서 불티 결과를 명시적으로 선택하면 `concertHallId`가 폼에 저장되어 백엔드가 연결 처리"한다. 카카오 결과 선택 시 백그라운드 자동 매칭은 하지 **않는다** (기획자 요청과 일치, 백엔드 명세와 일치).

## 3. 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│  PlaceSearchInput  (presentational, 렌더만)              │
│   ├─ 입력바 + 드롭다운 + 선택 후 상세 주소 인풋          │
│   └─ 섹션 헤더 "불티 등록 공연장" / "외부 검색 결과"     │
└────────────┬────────────────────────────────────────────┘
             │ (results, isLoading, errors, select)
             ▼
┌─────────────────────────────────────────────────────────┐
│  useVenueSearch  (apps/admin/src/hooks)                  │
│   ├─ 입력 디바운싱 (300ms)                                │
│   ├─ 병렬 호출: 불티 + 카카오 keyword + 카카오 address    │
│   ├─ Promise.allSettled로 부분 결과 점진 표시            │
│   ├─ 동일 공연장 중복 제거 (불티 우선)                    │
│   └─ source 태그된 통합 결과 반환                          │
└─┬───────────────────────────────┬────────────────────────┘
  │                               │
  ▼                               ▼
┌──────────────────────┐      ┌──────────────────────────┐
│ useConcertHallSearch │      │ useKakaoLocalSearch      │
│ (packages/api)       │      │ (apps/admin, 기존 유지)  │
│ TanStack Query       │      │ keyword + address fetch  │
│ GET /web/v1/host/    │      │ + AbortController        │
│   concert-halls      │      │                          │
└──────────────────────┘      └──────────────────────────┘
```

### 책임 분리

| 모듈 | 책임 |
|---|---|
| `packages/api/src/queries/useConcertHallSearch.ts` | 불티 백엔드 `searchConcertHalls` 호출 (TanStack Query) |
| `packages/api/src/queries/useConcertHallProfile.ts` | 불티 백엔드 `getProfile_1` 호출 (선택 시 lazy enable) |
| `packages/api/src/types/concertHall.ts` | `ConcertHallItem`, `WebHostConcertHallListResponse`, `ConcertHallProfileResponse`, `Location` 등 백엔드 응답 타입 정의 |
| `packages/api/src/queryKey.ts` | `concertHall.searchByKeyword(keyword)`, `concertHall.profile(concertHallId)` 네임스페이스 추가 |
| `apps/admin/src/hooks/useKakaoLocalSearch.ts` | 카카오 keyword + address 호출 (기존 유지; REST API key가 admin env에 있어서 admin 안에 둠) |
| `apps/admin/src/hooks/useVenueSearch.ts` | 두 소스를 병렬 호출·머지·중복 제거·정렬 (신규) |
| `apps/admin/src/components/PlaceSearchInput/` | 표현/상호작용 (드롭다운, 섹션 헤더, 배지, 선택 후 인풋 분기) |
| `apps/admin/src/components/ShowInfoFormContent/ShowBasicInfoFormContent.tsx` | 폼 state에 `concertHallId` 통합, 제출 페이로드 매핑 |

## 4. 데이터 흐름

### 검색 단계

1. 유저 입력 → `useVenueSearch`에서 300ms 디바운싱.
2. `Promise.allSettled`로 3개 API 병렬 호출:
   - 불티 `searchConcertHalls(keyword, page=0, size=5)`
   - 카카오 keyword
   - 카카오 address
3. 각 응답이 도착할 때마다 머지 결과 갱신 (부분 결과 점진 표시).
4. 머지 규칙:
   - **정렬**: 불티 결과 → 카카오 place → 카카오 address
   - **중복 제거**: 카카오 place 결과 중 이름이 불티 결과와 정확히 일치(공백 trim + 소문자 비교)하는 항목은 제외
   - **최대 표시 건수**: 불티 5건 + 카카오 place 5건 + 카카오 address 5건

### 선택 단계

**불티 공연장 선택 시**
1. 드롭다운 닫고 `useConcertHallProfile(concertHallId)`를 enable해서 `getProfile_1` 호출.
2. `head.location.{streetAddress, detailAddress, latitude, longitude}` 확보.
3. 폼 state 채워 넣기:
   - `place.name` = `ConcertHallItem.name`
   - `place.streetAddress` = `head.location.streetAddress` (없으면 `ConcertHallItem.address`)
   - `place.detailAddress` = `head.location.detailAddress` (없으면 빈 문자열)
   - `latitude`, `longitude` = `head.location.latitude`, `head.location.longitude`
   - **`concertHallId`** = `ConcertHallItem.id` ← 핵심
4. 상세 주소 인풋은 disabled.

**카카오 place(공연장명) 선택 시** — 기존 동작 그대로
- `concertHallId` = `undefined`로 폼에 저장.

**카카오 address(주소) 선택 시** — 기존 동작 그대로
- 빈 상세 주소 인풋, 자동 포커스. `concertHallId` = `undefined`.

### 제출 단계

`ShowCreateRequest` / `ShowUpdateRequestV2` payload 매핑:

```ts
{
  name,
  date,
  runningTime,
  place: { name, streetAddress, detailAddress },
  latitude,
  longitude,
  concertHallId,  // 불티 공연장 선택 시에만 number, 그 외 undefined
  // ... 기타 필드
}
```

백엔드가 `concertHallId` 유무에 따라 자동 연결 처리.

## 5. 컴포넌트 & 훅 API

### `useConcertHallSearch(keyword: string)` — packages/api/src/queries

```ts
const useConcertHallSearch = (keyword: string) =>
  useQuery({
    queryKey: queryKeys.concertHall.searchByKeyword(keyword),
    queryFn: () =>
      fetcher
        .get('web/v1/host/concert-halls', {
          searchParams: { keyword, page: 0, size: 5 },
        })
        .json<WebHostConcertHallListResponse>(),
    enabled: keyword.trim().length > 0,
    staleTime: 60_000,
  });
```

응답 타입:
```ts
type ConcertHallItem = { id: number; name: string; address: string; isVisible: boolean };
type WebHostConcertHallListResponse = {
  items: ConcertHallItem[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
};
```

### `useConcertHallProfile(concertHallId: number | null)`

```ts
const useConcertHallProfile = (concertHallId: number | null) =>
  useQuery({
    queryKey: queryKeys.concertHall.profile(concertHallId),
    queryFn: () =>
      fetcher
        .get(`web/papi/v1/concert-halls/${concertHallId}`)
        .json<ConcertHallProfileResponse>(),
    enabled: concertHallId != null,
  });
```

### `useVenueSearch()` — apps/admin/src/hooks

```ts
type VenueResult =
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

type VenueSource = VenueResult['source'];

type UseVenueSearchReturn = {
  query: string;
  setQuery: (q: string) => void;
  clearResults: () => void;
  results: VenueResult[];        // 머지된 단일 리스트, source 순으로 정렬
  isLoading: boolean;            // 모든 소스 중 하나라도 로딩 중
  errors: Partial<Record<VenueSource, Error>>;  // 부분 실패 표시용
};
```

### `PlaceSearchInput` (변경)

- 드롭다운 렌더 시 `results`를 source로 group:
  - `boolti` 그룹: 헤더 "불티 등록 공연장" + 각 아이템 우측에 작은 "불티 등록" 배지
  - `kakao_place` + `kakao_address` 그룹: 헤더 "외부 검색 결과"
- `onSelect` 콜백 시그니처 확장:
  ```ts
  onSelect: (result: {
    type: 'boolti' | 'kakao_place' | 'kakao_address';
    concertHallId?: number;
    placeName: string;
    streetAddress: string;
    detailAddress: string;
    latitude: number;
    longitude: number;
  }) => void;
  ```
- 선택 후 상세 주소 인풋 분기 (위 [§4 선택 단계](#선택-단계) 참고).

### `ShowBasicInfoFormContent` (변경)

- 폼 state에 `concertHallId?: number` 필드 추가.
- 제출 시 `ShowCreateRequest`/`ShowUpdateRequestV2`에 그대로 전달.
- 공연 수정 진입 시 기존 공연이 `concertHallId`를 갖고 있으면 disabled 상태로 표시, `×` 버튼 클릭 시 클리어 후 재검색 가능.

## 6. 에러 처리 & UX 디테일

| 상황 | 동작 |
|---|---|
| 한 소스만 실패 | 다른 결과 그대로 표시. 콘솔 warn만 (UI에 에러 미노출) |
| 전부 실패 | "검색 결과가 없어요" 일관 처리 (현재와 동일) |
| 빈 결과 | 검색어 있는데 모든 소스 0건 → "검색 결과가 없어요" |
| 첫 응답 전 | "검색 중..." 표시; 부분 결과 도착 시 즉시 표시로 전환 |
| `getProfile_1` 실패 | lat/lng 없이 폼에 `ConcertHallItem.address`만 채우고 `concertHallId`는 저장. 토스트로 "공연장 상세를 불러오지 못했어요. 다시 시도해주세요" 노출 |
| 연속 입력 race | 카카오 호출은 `AbortController`로 이전 요청 취소. 불티는 TanStack Query가 처리 |
| 공연 수정 진입, 기존 `concertHallId` 보유 | 검색바에 기존 공연장명이 표시되고 상세 주소 인풋은 disabled. 검색바 텍스트를 변경하기 시작하면 기존 동작대로 `selectedResult`가 클리어되고 재검색 모드로 전환 (현재 `PlaceSearchInput/index.tsx:75-86` 동작 그대로) |
| `isVisible=false` 공연장 | 백엔드가 응답에 포함시키면 그대로 표시. 클라이언트 필터는 추가하지 않음 (host 검색이므로 노출 정책은 백엔드 위임) |

## 7. 테스트 전략

### 유닛 테스트 (vitest, 기존 셋업)

- **`useVenueSearch`**:
  - 디바운싱: 300ms 내 연속 입력 → 한 번만 호출
  - 머지: 세 소스 응답 모두 도착 시 순서·중복 제거 정확
  - 부분 실패: `allSettled`로 일부 실패해도 나머지 표시
  - 빈 쿼리: API 호출 안 함
- **`PlaceSearchInput`**:
  - 불티 선택 → `onSelect`에 `type: 'boolti'`, `concertHallId` 포함
  - 불티 선택 후 상세 주소 disabled, address 자동 채워짐
  - 카카오 address 선택 → 상세 주소 활성 + autofocus
  - 섹션 헤더/배지 렌더링

### 통합 테스트 (vitest + msw, 기존 셋업)

- `ShowBasicInfoFormContent`: 공연장 선택 → 폼 state → 제출 페이로드에 `concertHallId` 포함 검증.

### E2E (Playwright, 기존 셋업)

- 시간 여유 있으면 공연 등록 플로우에 불티 공연장 선택 step 추가. 이번 스프린트 필수는 아님.

## 8. 스코프 밖 (Out of Scope)

- 페이지네이션 / 더보기 버튼 (첫 페이지만 표시; 후속)
- 카카오 결과의 좀 더 정교한 매칭 (위경도 기반 fuzzy match 등)
- 백엔드 통합 검색 API 신설 (현재 카카오 키가 프론트 env에 있어 비용 큼; 별도 안건)
- 카카오 keyword 호출의 `useQuery` 마이그레이션 (일관성은 좋지만 이번 작업 범위 밖)

## 9. 후속 작업

- main에 develop이 다시 머지될 시 venue/map이 main에 재유입되는 이슈는 [PR #431](https://github.com/Nexters/boolti-web/pull/431)과는 별개로 다음 develop → main 머지 시점에 다시 다룸 (별도 의사결정).
