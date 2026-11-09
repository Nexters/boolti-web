# 최근 검색어 삭제 확인을 `useConfirm`으로 교체하는 설계

## 목적

`ConcertHallSearchPage`의 최근 검색어 전체 삭제 확인창을 페이지 전용 모달에서
`@boolti/ui`의 `useConfirm`으로 교체한다. 사용자가 확인한 경우에만 최근 검색어를
상태와 localStorage에서 비우고, 취소하거나 닫은 경우에는 기존 검색어와 검색 입력
초안이 그대로 유지되도록 한다.

## 현재 문제

페이지가 `isRecentClearConfirmOpen` 상태와 `ConfirmModal`, `ModalBackdrop`,
`ModalButtons`를 직접 관리하고 있다. 이 흐름은 공통 Confirm 컴포넌트와 별도의
마크업·스타일을 유지하게 하며, 최근 검색어 삭제 확인 동작이 페이지 전용 구현에
묶여 있다.

현재 확인창의 사용자 계약은 다음과 같다.

- 메시지: `최근 검색어를 모두 삭제하시겠어요?`
- 취소 버튼: `취소하기`
- 확인 버튼: `삭제하기`
- 확인 시: 최근 검색어 목록과 `concert-hall-search-recent-keywords` localStorage 값을 `[]`로 변경
- 취소 시: 최근 검색어 목록과 localStorage를 변경하지 않음

## 선택한 접근

`ConcertHallSearchPage`에서 `useConfirm`을 직접 호출한다.

```tsx
const isConfirmed = await confirm('최근 검색어를 모두 삭제하시겠어요?', {
  cancel: '취소하기',
  confirm: '삭제하기',
});

if (isConfirmed) {
  clearRecentKeywords();
}
```

`useConfirm`은 `@boolti/ui`의 공통 Confirm Provider를 통해 Portal로 확인창을
렌더링하므로 페이지 전용 확인창의 상태, ref, 렌더링 블록, 관련 스타일을 제거한다.
확인 버튼 색상은 기존 페이지의 primary 확인 버튼과 동일하게 공통 Confirm의 기본값을
사용한다.

## 상태와 이벤트 흐름

```text
최근 검색어 전체 삭제 클릭
  -- pending ref = true, confirm() 호출 -->
공통 Confirm 표시
  -- 취소 --> false 반환, 목록 유지, pending ref 해제
  -- 확인 --> true 반환, 목록/localStorage 비우기, pending ref 해제
```

기존 검색 입력 초안 복원 동작은 유지한다. 확인창이 열린 뒤 공통 Confirm의 Portal
내부 버튼에서 발생하는 document-level `mousedown`이 페이지의 바깥 클릭 처리와
충돌하지 않도록, 확인 요청이 진행 중임을 ref로 표시한다. 바깥 클릭 핸들러는 이 ref가
설정된 동안 검색 필드를 닫거나 키워드 입력 초안을 복원하지 않는다. 확인이 취소되거나
완료되면 `finally`에서 ref를 해제한다.

최근 검색어 삭제 자체는 기존 `clearRecentKeywords`의 책임을 유지한다. 즉, 확인
함수는 사용자 의사만 반환하고 실제 상태·localStorage 변경은 확인 결과가 `true`인
경우에만 기존 삭제 함수가 수행한다.

## 영향 범위와 예외

- 변경 범위는 `apps/admin/src/pages/ConcertHallSearchPage/index.tsx`,
  `ConcertHallSearchPage.integration.test.tsx`, 그리고 해당 페이지에서 더 이상
  사용하지 않는 확인창 스타일 선언으로 제한한다.
- `@boolti/ui`의 `useConfirm` 구현과 Confirm Provider는 변경하지 않는다.
- 데스크톱·모바일의 `전체 삭제` 진입점은 모두 같은 확인 함수를 사용한다.
- 최근 검색어가 2개 미만일 때 `전체 삭제` 버튼이 표시되지 않는 기존 조건은 유지한다.
- 확인 API가 false를 반환하거나 Promise가 정상적으로 완료되지 않은 경우 삭제를
  수행하지 않는다. 요청 진행 ref는 항상 `finally`에서 해제한다.
- 정렬 상태, URL 검색 조건, 최근 검색어 개별 삭제, 검색어 선택 동작은 변경하지 않는다.

## 테스트 설계

페이지 통합 테스트의 `@boolti/ui` mock에 `useConfirm`을 추가하고, 다음의 실제
페이지 이벤트를 검증한다.

1. 데스크톱 진입점 클릭 시 `useConfirm`으로 확인 메시지와 `취소하기`/`삭제하기`
   라벨을 전달한다.
2. confirm 결과가 `false`이면 최근 검색어와 localStorage가 유지된다.
3. confirm 결과가 `true`이면 최근 검색어 목록과 localStorage가 비워진다.
4. 모바일 진입점도 동일한 confirm 함수를 호출한다.
5. 확인 요청이 진행 중인 동안 바깥 클릭 처리로 편집 중인 키워드 초안이 복원되지
   않는다.

검증은 먼저 해당 통합 테스트를 red-green 순서로 실행한 뒤, 변경 파일 ESLint,
`yarn workspace admin type-check`, `git diff --check`를 별도로 실행한다. 기존
페이지 스위트의 무관한 mock 또는 harness 실패가 있으면 새 회귀 테스트 결과와
구분해 보고한다.
