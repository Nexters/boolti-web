import { identifyUser, isAnalyticsWebView } from '@boolti/analytics';
import { queryKeys, useQueryClient } from '@boolti/api';
import { useEffect } from 'react';

import { useAuthAtom } from '~/atoms/useAuthAtom';

/** 로그인 상태면 Mixpanel 사용자를 식별한다. 화면에는 아무것도 그리지 않는다. */
const AnalyticsUserIdentifier = () => {
  const { isLogin } = useAuthAtom();
  const queryClient = useQueryClient();
  const isLoggedIn = isLogin();

  useEffect(() => {
    if (!isLoggedIn || isAnalyticsWebView()) return;

    // 분석용 조회가 실패해도 화면에 영향을 주지 않도록 에러 바운더리를 거치지 않는다
    queryClient
      .fetchQuery(queryKeys.user.profile)
      .then(({ id, userCode }) => identifyUser({ id, userCode }))
      .catch(() => {});
  }, [isLoggedIn, queryClient]);

  return null;
};

export default AnalyticsUserIdentifier;
