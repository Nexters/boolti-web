import './index.css';
import 'the-new-css-reset/css/reset.css';

import { ShowCastTeamReadResponse, ShowPreviewResponse } from '@boolti/api';
import { BooltiUIProvider } from '@boolti/ui';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { NavermapsProvider } from 'react-naver-maps';
import ShowPreviewPage from './pages/ShowPreviewPage';
import { fetcher } from '@boolti/api/src/fetcher';
import NotFound from './components/NotFound';
import ShowInfoDetailPage from './pages/ShowInfoDetailPage';

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
    path: '/show/:showId/info',
    element: <ShowInfoDetailPage />,
    loader: async ({ params }) => {
      const showId = params.showId;
      if (showId) {
        const response = await Promise.all([
          fetcher.get<ShowPreviewResponse>(`web/papi/v1/shows/${showId}`),
          fetcher.get<{ count: number }>(`web/papi/v1/shows/${showId}/sold-ticket-counts`),
        ]);
        return response;
      }
    },
    errorElement: <NotFound />,
  },
]);

const X_NCP_APIGW_API_KEY_ID = import.meta.env.VITE_X_NCP_APIGW_API_KEY_ID;

const App = () => {
  return (
    <NavermapsProvider ncpKeyId={X_NCP_APIGW_API_KEY_ID}>
      <BooltiUIProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </BooltiUIProvider>
    </NavermapsProvider>
  );
};

export default App;
