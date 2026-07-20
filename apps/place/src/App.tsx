import 'the-new-css-reset/css/reset.css';
import './index.css';

import { QueryClientProvider } from '@boolti/api';
import { BooltiUIProvider } from '@boolti/ui';
import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ConcertHallPage from './pages/ConcertHallPage';
import ConcertHallTabPage from './pages/ConcertHallTabPage';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/:concertHallId',
    element: <ConcertHallPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/:concertHallId/home',
    element: <ConcertHallTabPage tab="home" />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/:concertHallId/rental',
    element: <ConcertHallTabPage tab="rental" />,
    errorElement: <ErrorPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

const App = () => (
  <QueryClientProvider>
    <BooltiUIProvider>
      <Suspense fallback={null}>
        <RouterProvider router={router} />
      </Suspense>
    </BooltiUIProvider>
  </QueryClientProvider>
);

export default App;
