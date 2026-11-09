import { checkIsWebView } from '@boolti/bridge';
import { Navigate, Outlet, ScrollRestoration } from 'react-router-dom';
import { Suspense } from 'react';

import { useAuthAtom } from '~/atoms/useAuthAtom';
import { PATH } from '~/constants/routes';
import { LOGIN_SOURCE } from '~/constants/analytics';

const PrivateRoute = () => {
  const { isLogin } = useAuthAtom();

  if (!isLogin() && !checkIsWebView()) {
    return <Navigate to={PATH.LOGIN} state={{ source: LOGIN_SOURCE.AUTH_REQUIRED }} replace />;
  }

  return (
    <>
      <ScrollRestoration />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default PrivateRoute;
