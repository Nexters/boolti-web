/**
 * 공연장 찾기(공연장 검색 페이지) 이동을 담당하는 단일 핸들러.
 *
 * 띠배너(SpaceBanner)와 헤더 Nav("공연장 찾기")가 모두 이 핸들러를 사용한다.
 *
 * TODO: 공연장 검색 페이지 라우트 연결 예정.
 *   동료가 작업 중인 "공연장 검색" 기능이 완료되면 아래 핸들러에서 해당 경로로 이동하도록 연결한다.
 *   경로가 확정되면 이 파일 한 곳만 수정하면 된다.
 *
 *   - 앱 내부 라우트인 경우:
 *       const navigate = useNavigate();
 *       navigate(PATH.SPACE_SEARCH);
 *   - 외부 링크인 경우:
 *       window.open(EXTERNAL.SPACE_SEARCH, '_blank');
 */
export const useFindSpace = () => {
  const handleFindSpace = () => {
    // TODO: 공연장 검색 경로 확정 후 이동 로직 연결 (현재 경로 미정으로 동작 없음)
  };

  return { handleFindSpace };
};
