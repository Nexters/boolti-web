import 'the-new-css-reset/css/reset.css';
import './index.css';

import { LOCAL_STORAGE, QueryClientProvider } from '@boolti/api';
import { BooltiUIProvider } from '@boolti/ui';
import { setDefaultOptions } from 'date-fns';
import { ko } from 'date-fns/locale';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';

import AuthErrorBoundary from './components/ErrorBoundary/AuthErrorBoundary';
import { PATH } from './constants/routes';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Login/LoginPage';
import OAuthApplePage from './pages/OAuth/OAuthApplePage';
import OAuthKakaoPage from './pages/OAuth/OAuthKakaoPage';
import ShowAddCompletePage from './pages/ShowAddCompletePage/ShowAddCompletePage';
import ShowAddPage from './pages/ShowAddPage/ShowAddPage';
import ShowEnterancePage from './pages/ShowEnterancePage';
import ShowInfoPage from './pages/ShowInfoPage/ShowInfoPage';
import ShowReservationPage from './pages/ShowReservationPage';
import ShowTicketPage from './pages/ShowTicketPage/ShowTicketPage';
import SignUpCompletePage from './pages/SignUpComplete/SignUpCompletePage';

setDefaultOptions({ locale: ko });

const PublicRoute = () => {
  const isLogin =
    window.localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN) &&
    window.localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN);

  if (isLogin) {
    return <Navigate to={PATH.HOME} replace />;
  }

  return <Outlet />;
};

const publicRoutes = [
  {
    element: <PublicRoute />,
    children: [
      {
        path: PATH.INDEX,
        element: <Navigate to={PATH.LOGIN} replace />, // Note: 이후 랜딩 페이지로 교체 필요
      },
      {
        path: PATH.LOGIN,
        element: <LoginPage />,
      },
      {
        path: PATH.OAUTH_KAKAO,
        element: <OAuthKakaoPage />,
      },
      {
        path: PATH.OAUTH_APPLE,
        element: <OAuthApplePage />,
      },
      {
        path: '*',
        element: <Navigate to={PATH.INDEX} replace />,
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
        path: PATH.SIGNUP_COMPLETE,
        element: <SignUpCompletePage />,
      },
      { path: PATH.HOME, element: <HomePage /> },
      { path: PATH.SHOW_ADD, element: <ShowAddPage step="info" /> },
      { path: PATH.SHOW_ADD_TICKET, element: <ShowAddPage step="ticket" /> },
      { path: PATH.SHOW_INFO, element: <ShowInfoPage /> },
      { path: PATH.SHOW_TICKET, element: <ShowTicketPage /> },
      { path: PATH.SHOW_RESERVATION, element: <ShowReservationPage /> },
      { path: PATH.SHOW_ENTRANCE, element: <ShowEnterancePage /> },
      {
        path: PATH.SHOW_ADD_COMPLETE,
        element: <ShowAddCompletePage />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...privateRoutes]);

const App = () => {
  return (
    <QueryClientProvider>
      <BooltiUIProvider>
        <RouterProvider router={router} />
      </BooltiUIProvider>
    </QueryClientProvider>
  );
};

export default App;
