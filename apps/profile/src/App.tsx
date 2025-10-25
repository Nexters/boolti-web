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

const router = createBrowserRouter([
  {
    path: '/:nickName',
    element: <ProfilePage />,
    errorElement: <NotFound />,
  },
  {
    path: '/:nickName/shows',
    element: <ProfilePastShowsPage />,
  },
  {
    path: '/:nickName/videos',
    element: <ProfileVideosPage />,
  },
  {
    path: '/:nickName/links',
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
          <RouterProvider router={router} />
        </HelmetProvider>
      </BooltiUIProvider>
    </QueryClientProvider>
  );
};

export default App;
