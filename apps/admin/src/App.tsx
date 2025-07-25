import 'the-new-css-reset/css/reset.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import './index.css';
import './i18n';
import { NavermapsProvider } from 'react-naver-maps';
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
  SignUpCompletePage,
  SitePolicyPage,
  GiftRegisterPage,
  GiftIntroPage,
  OAuthApplePage,
  ShowTypeSelectpage,
} from './pages';
import ShowAddPage from './pages/ShowAddPage';
import { Suspense } from 'react';
import { domAnimation, LazyMotion } from 'framer-motion';
import ShowDetailLayout from './components/ShowDetailLayout';
import ShowInfoPage from './pages/ShowInfoPage';
import ShowTicketPage from './pages/ShowTicketPage';
import ShowReservationPage from './pages/ShowReservationPage';
import ShowSettlementPage from './pages/ShowSettlementPage';
import ShowEnterancePage from './pages/ShowEnterancePage';
import { initVConsole } from './utils/vConsole';
import { checkIsWebView } from '@boolti/bridge';
import { X_NCP_APIGW_API_KEY_ID } from './constants/ncp';
import { IS_PRODUCTION_PHASE } from './constants/phase';
import WebView from './pages/WebView';

setDefaultOptions({ locale: ko });

initVConsole();

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

  if (!isLogin() && !checkIsWebView()) {
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
      { path: PATH.SHOW_ADD, element: <ShowAddPage step="basic" /> },
      { path: PATH.SHOW_ADD_DETAIL, element: <ShowAddPage step="detail" /> },
      { path: PATH.SHOW_ADD_SALES, element: <ShowAddPage step="sales" /> },
      { path: PATH.SHOW_TYPE_SELECT, element: <ShowTypeSelectpage /> },
      {
        path: '/',
        element: (
          <ShowDetailLayout>
            <Outlet />
          </ShowDetailLayout>
        ),
        children: [
          { path: PATH.SHOW_INFO, element: <ShowInfoPage /> },
          { path: PATH.SHOW_TICKET, element: <ShowTicketPage /> },
          { path: PATH.SHOW_RESERVATION, element: <ShowReservationPage /> },
          { path: PATH.SHOW_ENTRANCE, element: <ShowEnterancePage /> },
          { path: PATH.SHOW_SETTLEMENT, element: <ShowSettlementPage /> },
        ],
      },
    ],
  },
];

const routes: RouteObject[] = [
  {
    element: (
      <QueryClientProvider>
        <BooltiUIProvider>
          <LazyMotion features={domAnimation}>
            <NavermapsProvider ncpKeyId={X_NCP_APIGW_API_KEY_ID} submodules={['geocoder']}>
              <Outlet />
            </NavermapsProvider>
          </LazyMotion>
        </BooltiUIProvider>
      </QueryClientProvider>
    ),
    errorElement: <GlobalErrorBoundary />,
    children: [
      ...publicRoutes,
      ...privateRoutes,
      ...(IS_PRODUCTION_PHASE ? [] : [{ path: PATH.WEBVIEW, element: <WebView /> }]),
    ],
  },
];

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <Suspense fallback={null}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
