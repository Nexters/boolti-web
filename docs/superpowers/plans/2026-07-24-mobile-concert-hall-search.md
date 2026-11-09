# Mobile Concert Hall Search Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 제공된 시안에 맞춰 모바일 공연장 검색 입력 영역의 문구와 외형을 변경한다.

**Architecture:** 기존 검색 폼 DOM과 이벤트 처리는 유지한다. `640px` 이하 미디어 쿼리에서만 검색 폼, 입력 필드, 검색 버튼의 스타일을 덮어써 데스크톱과 모바일 바텀시트에 영향을 주지 않는다.

**Tech Stack:** React, TypeScript, Emotion styled, Vitest, Testing Library

---

### Task 1: 모바일 검색 입력 계약 고정

**Files:**
- Modify: `apps/admin/src/pages/ConcertHallSearchPage/ConcertHallSearchPage.integration.test.tsx`
- Modify: `apps/admin/src/pages/ConcertHallSearchPage/index.tsx`

- [ ] **Step 1: 새 placeholder를 기대하는 실패 테스트 작성**

```tsx
expect(screen.getByPlaceholderText('내 조건에 맞는 공연장 찾기')).not.toBeNull();
```

- [ ] **Step 2: 포커스 테스트를 실행해 실패 확인**

Run: `yarn workspace admin test ConcertHallSearchPage --run`
Expected: 새 placeholder를 찾지 못해 FAIL

- [ ] **Step 3: 메인 검색 입력의 placeholder 변경**

```tsx
placeholder="내 조건에 맞는 공연장 찾기"
```

기존 테스트의 메인 입력 조회도 동일한 문구를 사용하되, 모바일 바텀시트의 `지역, 공연장명 검색` 문구는 유지한다.

- [ ] **Step 4: 포커스 테스트 재실행**

Run: `yarn workspace admin test ConcertHallSearchPage --run`
Expected: PASS

### Task 2: 모바일 전용 시각 스타일 적용

**Files:**
- Modify: `apps/admin/src/pages/ConcertHallSearchPage/ConcertHallSearchPage.styles.ts`

- [ ] **Step 1: `SearchForm` 모바일 외형 변경**

모바일 미디어 쿼리에 다음 스타일을 적용한다.

```tsx
height: 48px;
min-height: 48px;
border: 0;
border-radius: 4px;
background: ${({ theme }) => theme.palette.mobile.grey.g85};
```

- [ ] **Step 2: 입력 영역과 버튼 정렬 변경**

`SearchInputField`의 모바일 padding은 `0 16px 0 20px`로 맞춘다. `KeywordInput`에는 기존 admin 모바일 본문 토큰을 적용한다.

```tsx
${({ theme }) => theme.typo.b3};
```

`SearchButton`은 모바일에서 다음과 같이 스타일링한다.

```tsx
width: 52px;
height: 48px;
color: ${({ theme }) => theme.palette.mobile.grey.g60};
background: transparent;
border-radius: 0;
```

- [ ] **Step 3: 하드코딩 색상 부재 확인**

Run: `rg -n "#[0-9a-fA-F]{3,8}|rgba\\(|rgb\\(" apps/admin/src/pages/ConcertHallSearchPage/ConcertHallSearchPage.styles.ts`
Expected: 이번 변경으로 추가된 색상 리터럴 없음

### Task 3: 회귀 및 시각 검증

**Files:**
- Verify: `apps/admin/src/pages/ConcertHallSearchPage/ConcertHallSearchPage.integration.test.tsx`
- Verify: `apps/admin/src/pages/ConcertHallSearchPage/ConcertHallSearchPage.styles.ts`
- Verify: `apps/admin/src/pages/ConcertHallSearchPage/index.tsx`

- [ ] **Step 1: 포커스 테스트 실행**

Run: `yarn workspace admin test ConcertHallSearchPage --run`
Expected: PASS

- [ ] **Step 2: 타입 검사와 변경 파일 린트 실행**

Run: `yarn workspace admin type-check`
Expected: PASS

Run: `yarn eslint apps/admin/src/pages/ConcertHallSearchPage/ConcertHallSearchPage.styles.ts apps/admin/src/pages/ConcertHallSearchPage/index.tsx apps/admin/src/pages/ConcertHallSearchPage/ConcertHallSearchPage.integration.test.tsx --report-unused-disable-directives`
Expected: PASS

- [ ] **Step 3: diff 유효성 확인**

Run: `git diff --check`
Expected: PASS

- [ ] **Step 4: 320px 뷰포트 시각 비교**

로컬 admin 앱을 실행하고 320px 너비에서 검색 박스가 좌우 20px, 높이 48px, 반경 4px, 회색 아이콘과 새 placeholder로 표시되는지 확인한다.
