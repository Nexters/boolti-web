import './index.css';
import 'the-new-css-reset/css/reset.css';

import { QueryClientProvider } from '@boolti/api';
import { BooltiUIProvider } from '@boolti/ui';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ShowPreviewPage from './pages/ShowPreviewPage/ShowPreviewPage';

const router = createBrowserRouter([
  {
    path: '/show/:showId',
    element: <ShowPreviewPage />,
  },
]);

const App = () => {
  return (
    <QueryClientProvider>
      <BooltiUIProvider>
        <RouterProvider router={router} />
      </BooltiUIProvider>
    </QueryClientProvider>
  );
};

export default App;
