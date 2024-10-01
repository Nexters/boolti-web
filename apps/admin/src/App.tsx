import 'the-new-css-reset/css/reset.css';
import './index.css';

import { QueryClientProvider } from '@boolti/api';
import { BooltiUIProvider } from '@boolti/ui';
import { setDefaultOptions } from 'date-fns';
import { ko } from 'date-fns/locale';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  ScrollRestoration,
} from 'react-router-dom';

import AuthErrorBoundary from './components/ErrorBoundary/AuthErrorBoundary';
import { PATH } from './constants/routes';
import { useAuthAtom } from './atoms/useAuthAtom';
import GlobalErrorBoundary from './components/ErrorBoundary/GlobalErrorBoundary';
import {
  LandingPage,
  LoginPage,
  QRPage,
  OAuthKakaoPage,
  HomePage,
  ShowAddCompletePage,
  ShowEnterancePage,
  ShowInfoPage,
  ShowReservationPage,
  ShowSettlementPage,
  ShowTicketPage,
  SignUpCompletePage,
  SitePolicyPage,
  GiftRegisterPage,
  GiftIntroPage,
  OAuthApplePage,
} from './pages';
import ShowAddPage from './pages/ShowAddPage';
import { Suspense } from 'react';

setDefaultOptions({ locale: ko });

const publicRoutes = [
  {
    element: (
      <>
        <ScrollRestoration />
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </>
    ),
    children: [
      {
        path: PATH.INDEX,
        element: <LandingPage />,
      },
      {
        path: PATH.LOGIN,
        element: <LoginPage />,
      },
      {
        path: PATH.QR,
        element: <QRPage />,
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
        path: PATH.SITE_POLICY,
        element: <SitePolicyPage />,
      },
      {
        path: PATH.GIFT_INTRO,
        element: <GiftIntroPage />,
      },
      {
        path: PATH.GIFT_REGISTER,
        element: <GiftRegisterPage />,
      },
      {
        path: '*',
        element: <Navigate to={PATH.INDEX} replace />,
      },
    ],
  },
];

const PrivateRoute = () => {
  const { isLogin } = useAuthAtom();

  if (!isLogin()) {
    return <Navigate to={PATH.LOGIN} replace />;
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
      { path: PATH.SHOW_SETTLEMENT, element: <ShowSettlementPage /> },
      {
        path: PATH.SHOW_ADD_COMPLETE,
        element: <ShowAddCompletePage />,
      },
    ],
  },
];

const routes: RouteObject[] = [
  {
    element: (
      <QueryClientProvider>
        <BooltiUIProvider>
          <Outlet />
        </BooltiUIProvider>
      </QueryClientProvider>
    ),
    errorElement: <GlobalErrorBoundary />,
    children: [...publicRoutes, ...privateRoutes],
  },
];

const router = createBrowserRouter(routes);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
