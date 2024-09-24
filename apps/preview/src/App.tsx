import './index.css';
import 'the-new-css-reset/css/reset.css';

import { ShowPreviewResponse } from '@boolti/api';
import { BooltiUIProvider } from '@boolti/ui';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import ShowPreviewPage from './pages/ShowPreviewPage';
import { fetcher } from '@boolti/api/src/fetcher';

const router = createBrowserRouter([
  {
    path: '/show/:showId',
    element: <ShowPreviewPage />,
    loader: async ({ params }) => {
      const showId = params.showId;
      if (showId) {
        const response = await fetcher.get<ShowPreviewResponse>(`web/papi/v1/shows/${showId}`);
        return response;
      }
    },
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
