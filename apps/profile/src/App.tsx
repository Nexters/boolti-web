import './index.css';
import 'the-new-css-reset/css/reset.css';
import 'swiper/css';

import { BooltiUIProvider } from '@boolti/ui';
import { QueryClientProvider } from '@boolti/api';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import ProfilePage from './pages/ProfilePage';
import NotFound from './components/NotFound';
import { ProfilePastShowsPage } from './pages/ProfilePastShowsPage';
import { ProfileVideosPage } from './pages/ProfileVideosPage';
import { ProfileLinkPage } from './pages/ProfileLinkPage';
import { Suspense } from 'react';

const router = createBrowserRouter([
  {
    path: '/:userCode',
    element: <ProfilePage />,
    errorElement: <NotFound />,
  },
  {
    path: '/:userCode/shows',
    element: <ProfilePastShowsPage />,
  },
  {
    path: '/:userCode/videos',
    element: <ProfileVideosPage />,
  },
  {
    path: '/:userCode/links',
    element: <ProfileLinkPage />,
  },
  {
    path: '/',
    element: <NotFound />,
  },
]);

const App = () => {
  return (
    <QueryClientProvider>
      <BooltiUIProvider>
        <HelmetProvider>
          <Suspense fallback={null}>
            <RouterProvider router={router} />
          </Suspense>
        </HelmetProvider>
      </BooltiUIProvider>
    </QueryClientProvider>
  );
};

export default App;
