import './index.css';
import 'the-new-css-reset/css/reset.css';

import { ShowCastTeamReadResponse, ShowPreviewResponse } from '@boolti/api';
import { BooltiUIProvider } from '@boolti/ui';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import ShowPreviewPage from './pages/ShowPreviewPage';
import { fetcher } from '@boolti/api/src/fetcher';
import NotFound from './components/NotFound';
import ShowPreviewNoticePage from './pages/ShowPreviewNoticePage';

const router = createBrowserRouter([
  {
    path: '/show/:showId',
    element: <ShowPreviewPage />,
    loader: async ({ params }) => {
      const showId = params.showId;
      if (showId) {
        const response = await Promise.all([
          fetcher.get<ShowPreviewResponse>(`web/papi/v1/shows/${showId}`),
          fetcher.get<ShowCastTeamReadResponse[]>(`web/papi/v1/shows/${showId}/cast-teams`),
        ]);
        return response;
      }
    },
    errorElement: <NotFound />,
  },
  {
    path: '/show/:showId/notice',
    element: <ShowPreviewNoticePage />,
    loader: async ({ params }) => {
      const showId = params.showId;
      if (showId) {
        return await fetcher.get<ShowPreviewResponse>(`web/papi/v1/shows/${showId}`);
      }
    },
    errorElement: <NotFound />,
  }
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
