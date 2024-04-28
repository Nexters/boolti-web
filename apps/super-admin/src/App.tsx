import 'the-new-css-reset/css/reset.css';
import './index.css';

import { LOCAL_STORAGE, QueryClientProvider } from '@boolti/api';
import { BooltiUIProvider } from '@boolti/ui';
import { App } from 'antd';
import { setDefaultOptions } from 'date-fns';
import { ko } from 'date-fns/locale';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';

import AuthErrorBoundary from './components/ErrorBoundary/AuthErrorBoundary';
import { PATH } from './constants/routes';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

setDefaultOptions({ locale: ko });

const PublicRoute = () => {
  const isLogin =
    window.localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN) &&
    window.localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN);

  if (isLogin) {
    return <Navigate to={PATH.INDEX} replace />;
  }

  return <Outlet />;
};

const publicRoutes = [
  {
    element: <PublicRoute />,
    children: [
      {
        path: PATH.LOGIN,
        element: <LoginPage />,
      },
    ],
  },
];

const PrivateRoute = () => {
  const isLogin =
    window.localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN) &&
    window.localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN);

  if (!isLogin) {
    return <Navigate to={PATH.LOGIN} replace />;
  }

  return <Outlet />;
};

const privateRoutes = [
  {
    element: (
      <AuthErrorBoundary>
        <PrivateRoute />
      </AuthErrorBoundary>
    ),
    children: [
      {
        path: PATH.INDEX,
        element: <HomePage />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...privateRoutes]);

const SuperAdmin = () => {
  return (
    <QueryClientProvider>
      <BooltiUIProvider>
        <App message={{ maxCount: 1 }}>
          <RouterProvider router={router} />
        </App>
      </BooltiUIProvider>
    </QueryClientProvider>
  );
};

export default SuperAdmin;
