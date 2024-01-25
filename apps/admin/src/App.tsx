import { QueryClientProvider } from '@boolti/api';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import ThemeProvider from './styles/ThemeProvider';
import LoginPage from './pages/Login/LoginPage';
import SignUpCompletePage from './pages/SignUpComplete/SignUpCompletePage';
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
    path: PATH.SIGNUP_COMPLETE,
    element: <SignUpCompletePage />,
  },
  { path: PATH.HOME, element: <></> },
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
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
