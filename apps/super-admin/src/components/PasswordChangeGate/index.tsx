import { useSuperAdminMe } from '@boolti/api';
import { Spin } from 'antd';
import { Navigate, useLocation } from 'react-router-dom';

import { PATH } from '~/constants/routes';

/**
 * 임시 비밀번호로 로그인한 계정은 비밀번호를 바꾸기 전까지 다른 API가 막힌다.
 * 다른 화면의 조회가 막힌 API를 부르기 전에 변경 화면으로 보낸다.
 *
 * 본인 정보 조회가 실패하면 제한이 없는 것으로 보고 그대로 보여 준다.
 * 이 조회 하나 때문에 모든 화면이 막히지 않게 하기 위해서다.
 */
const PasswordChangeGate = ({ children }: React.PropsWithChildren) => {
  const { pathname } = useLocation();
  const { data: me, isLoading } = useSuperAdminMe();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
        <Spin />
      </div>
    );
  }

  if (me?.passwordChangeRequired && pathname !== PATH.PASSWORD_CHANGE) {
    return <Navigate to={PATH.PASSWORD_CHANGE} replace />;
  }

  return <>{children}</>;
};

export default PasswordChangeGate;
