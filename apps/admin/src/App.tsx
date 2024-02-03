import { QueryClientProvider } from '@boolti/api';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { BooltiUIProvider } from '@boolti/ui';
import LoginPage from './pages/Login/LoginPage';
import SignUpCompletePage from './pages/SignUpComplete/SignUpCompletePage';
import HomePage from './pages/HomePage/HomePage';
import OAuthKakaoPage from './pages/OAuth/OAuthKakaoPage';
import OAuthApplePage from './pages/OAuth/OAuthApplePage';
import 'the-new-css-reset/css/reset.css';
import './index.css';
import { PATH } from './constants/routes';

const router = createBrowserRouter([
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
    path: PATH.SIGNUP_COMPLETE,
    element: <SignUpCompletePage />,
  },
  { path: PATH.HOME, element: <HomePage /> },
  {
    path: '*',
    element: <Navigate to={PATH.INDEX} replace />,
  },
]);

const App = () => {
  // const { data } = useHelloQuery();
  // console.log(data?.hello)
  return (
    <QueryClientProvider>
      <BooltiUIProvider>
        <RouterProvider router={router} />
      </BooltiUIProvider>
    </QueryClientProvider>
  );
};

export default App;
