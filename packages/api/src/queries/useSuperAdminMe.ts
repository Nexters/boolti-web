import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

/**
 * 로그인한 슈퍼 어드민 본인 정보.
 * 화면 전체를 감싸는 가드에서 쓰므로 실패해도 에러 바운더리로 던지지 않는다.
 * 호출하는 쪽이 실패를 "제한 없음"으로 처리한다.
 */
const useSuperAdminMe = ({ enabled = true }: { enabled?: boolean } = {}) =>
  useQuery({
    ...queryKeys.superAdminUser.me,
    enabled,
    useErrorBoundary: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

export default useSuperAdminMe;
