# 모바일 공연장 검색 영역 디자인

## 목표

`ConcertHallSearchPage`의 모바일 검색 입력 영역을 제공된 320px 시안과 일치하도록 변경한다. 데스크톱 검색 폼과 기존 검색·자동완성 동작은 유지한다.

## 디자인

- 모바일 검색 영역은 좌우 20px 여백 안에서 높이 48px, 모서리 반경 4px의 직사각형으로 표시한다.
- 배경은 `theme.palette.mobile.grey.g85`, placeholder와 검색 아이콘은 기존 팔레트 토큰을 사용한다.
- placeholder는 `내 조건에 맞는 공연장 찾기`로 변경한다.
- 검색 버튼의 원형 주황색 배경을 모바일에서 제거하고 회색 검색 아이콘만 표시한다.
- 모든 색상과 타이포그래피는 `theme.palette`와 `theme.typo`를 사용하며 새 색상 리터럴을 추가하지 않는다.

## 구현 범위

- `ConcertHallSearchPage.styles.ts`의 모바일 미디어 쿼리에서 검색 폼과 자식 요소의 외형을 재정의한다.
- `index.tsx`의 메인 검색 입력 placeholder를 변경한다.
- 모바일 바텀시트 내부 검색 입력과 데스크톱 전용 외형은 변경하지 않는다.

## 검증

- 통합 테스트로 메인 검색 입력의 새 placeholder와 기존 검색 동작을 확인한다.
- `ConcertHallSearchPage` 포커스 테스트, admin 타입 검사, 변경 파일 린트, `git diff --check`를 실행한다.
- 320px 모바일 뷰포트에서 시안과 레이아웃을 비교한다.
