import './index.css';
import 'the-new-css-reset/css/reset.css';
import 'swiper/css';

import { BooltiUIProvider } from '@boolti/ui';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import ProfilePage from './pages/ProfilePage';
import NotFound from './components/NotFound';

const router = createBrowserRouter([
  {
    path: '/:nickName',
    element: <ProfilePage />,
    errorElement: <NotFound />,
  },
  {
    path: '/',
    element: <NotFound />,
  },
]);

const App = () => {
  return (
    <BooltiUIProvider>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </BooltiUIProvider>
  );
};

export default App;
