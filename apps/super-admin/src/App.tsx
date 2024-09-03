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
import SettlementPage from './pages/SettlementPage';
import Layout from './components/Layout/Layout';
import InfoPage from './pages/InfoPage';
import TicketPage from './pages/TicketPage';
import PaymentPage from './pages/PaymentPage';
import EntrancePage from './pages/EntrancePage';

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
        <Layout>
          <PrivateRoute />
        </Layout>
      </AuthErrorBoundary>
    ),
    children: [
      {
        path: PATH.INDEX,
        element: <HomePage />,
      },
      {
        path: PATH.INFO,
        element: <InfoPage />,
      },
      {
        path: PATH.TICKET,
        element: <TicketPage />,
      },
      {
        path: PATH.PAYMENT,
        element: <PaymentPage />,
      },
      {
        path: PATH.ENTRANCE,
        element: <EntrancePage />,
      },
      {
        path: PATH.SETTLEMENT,
        element: <SettlementPage />,
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
