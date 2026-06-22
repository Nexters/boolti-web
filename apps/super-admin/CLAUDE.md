# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 위치와 범위

이 디렉터리(`apps/super-admin`)는 **불티 팀원이 사용하는 슈퍼 어드민 페이지**입니다. `boolti-web` Turborepo 모노레포의 한 앱이며, `@boolti/api`, `@boolti/ui`, `@boolti/icon` 워크스페이스 패키지에 의존합니다. (Node 20.11.0, Yarn 4 PnP)

## 명령어

이 앱에서 직접 실행:

- `yarn dev` — Vite dev 서버 (포트 **8082**)
- `yarn build` — `tsc && vite build` (타입 에러가 있으면 빌드 실패)
- `yarn type-check` — `tsc --noEmit`
- `yarn lint` / `yarn lint:fix`

모노레포 루트에서 turbo로 전체 실행: `yarn dev`, `yarn build`, `yarn lint`, `yarn type-check`.

> 테스트 러너는 설정되어 있지 않습니다. 검증은 `type-check` + `lint`로 합니다.

## 아키텍처

### 라우팅 / 인증 (`src/App.tsx`)

- `createBrowserRouter`로 라우트를 `publicRoutes`(로그인) / `privateRoutes`로 나눕니다.
- 인증은 **localStorage의 토큰 존재 여부**로만 판정합니다 (`PublicRoute`/`PrivateRoute`가 `LOCAL_STORAGE.ACCESS_TOKEN` + `REFRESH_TOKEN` 확인). 미인증 시 `/login`으로 리다이렉트.
- private 라우트는 `AuthErrorBoundary` → `Layout` → `PrivateRoute(Outlet)` 순으로 감쌉니다.
- 모든 경로는 `src/constants/routes.ts`의 `PATH`(라우트 정의)와 `HREF`(링크 생성 함수)를 통해서만 다룹니다. 새 라우트 추가 시 둘 다 수정.
- `Layout`은 `/show/`로 시작하는 경로일 때만 `SideNavigation`을 렌더합니다. 공연 상세는 `/show/:showId/{info,ticket,payment,entrance,settlement}` 구조.
- Provider 중첩: `QueryClientProvider`(@boolti/api) → `BooltiUIProvider`(@boolti/ui, Emotion theme) → antd `App`.

### 데이터 페칭 — `@boolti/api` (`packages/api`)

- React Query(v4) + `@lukemorales/query-key-factory` 기반. 쿼리/뮤테이션은 **앱이 아니라 `packages/api`에 추가**하고 거기서 export한 훅(`useAdminShowList`, `useSuperAdminUserList` 등)을 import해서 씁니다.
- 쿼리 정의(`queryFn`, URL)는 `packages/api/src/queryKey.ts`에 모여 있고, `src/queries/*`의 훅은 `useQuery(queryKeys.xxx)`로 얇게 감싸기만 합니다. 뮤테이션은 `src/mutations/*`.
- HTTP 클라이언트는 `ky`(`src/fetcher.ts`). `beforeRequest`에서 Bearer 토큰 주입, `afterResponse`에서 **401 시 Mutex로 토큰 갱신 후 재요청**, refresh 실패 시 토큰 삭제.
- **슈퍼 어드민 API 분기**: `IS_SUPER_ADMIN`(`VITE_IS_SUPER_ADMIN`, vite.config.ts에서 `'true'` 주입)에 따라 엔드포인트가 갈립니다. 슈퍼 어드민 엔드포인트는 `sa-api/...` 프리픽스, refresh는 `sa-api/papi/v1/login/refresh`. `admin`/`web` 앱과 api 패키지를 공유하므로 새 쿼리 추가 시 이 분기를 반드시 확인.

### UI / 스타일링 — antd 주력 + @boolti/ui 보조 (주의)

이 앱은 `@boolti/ui`와 antd를 둘 다 import하지만 **역할이 다릅니다**. import만 보고 둘이 대등하게 공존한다고 오해하지 마세요. 실제 사용 빈도 기준:

- **antd (Ant Design)이 실질적 주력 컴포넌트 라이브러리**입니다. `Form`/`Input`/`Select`/`DatePicker`/`InputNumber`(폼), `Table`/`Pagination`(목록), `Layout`/`Menu`/`Card`/`Modal`(구조), `@ant-design/icons`까지 대부분의 시각·구조 컴포넌트는 antd입니다. 새 화면의 폼·테이블·레이아웃은 antd로 만드는 것이 기존 컨벤션입니다.
- **`@boolti/ui`는 선택적으로만** 씁니다. 실제로 쓰이는 것은 거의 (1) `Button`, (2) **크로스앱 훅** `useToast`/`useConfirm`/`useDialog`/`useDropdown`, (3) `App.tsx`의 `BooltiUIProvider`(Emotion theme + 토스트/다이얼로그 컨텍스트 제공), `StepDialog` 정도입니다. 토스트·확인 다이얼로그가 필요하면 antd가 아니라 `@boolti/ui`의 훅을 쓰세요.
- **Emotion(`*.styles.ts`)**은 위 두 라이브러리와 무관하게 커스텀 스타일링 전반에 쓰입니다. `theme.palette`/`theme.typo` 토큰과 `mq_lg` 미디어쿼리, styled를 객체로 묶어 default export하는 패턴은 `.cursor/skills/boolti-ui/SKILL.md` 참고. (단 이 스킬 문서는 `apps/admin` 기준이라 jotai/framer-motion 등 일부 스택은 super-admin에 없음.)
- 폼은 antd `Form` 또는 `react-hook-form`(`FormProvider` + `register`)을 화면에 따라 사용합니다.

### 컴포넌트 컨벤션

- `src/pages/*`, `src/components/*` 각각 폴더 단위. Emotion 화면은 `index.tsx` + `Component.styles.ts`(styled를 객체로 묶어 default export), antd 화면은 `index.tsx` 단일 파일.
- import alias: `~` → `/src` (vite + tsconfig).
- 날짜는 `date-fns` + `ko` locale (App.tsx에서 `setDefaultOptions({ locale: ko })` 전역 설정).
