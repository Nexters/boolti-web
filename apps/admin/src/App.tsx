import { QueryClientProvider } from '@boolti/api';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import ThemeProvider from './styles/ThemeProvider';
import LoginPage from './pages/Login/LoginPage';
import 'the-new-css-reset/css/reset.css';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />, // Note: 이후 랜딩 페이지로 교체 필요
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
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
