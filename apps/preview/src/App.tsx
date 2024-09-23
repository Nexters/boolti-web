import './index.css';
import 'the-new-css-reset/css/reset.css';

import { QueryClientProvider } from '@boolti/api';
import { BooltiUIProvider } from '@boolti/ui';
import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import ShowPreviewPage from './pages/ShowPreviewPage/ShowPreviewPage';

const App = () => {
  return (
    <QueryClientProvider>
      <BooltiUIProvider>
        <HelmetProvider>
          <Routes>
            <Route element={<ShowPreviewPage />} path="/show/:showId" />
          </Routes>
        </HelmetProvider>
      </BooltiUIProvider>
    </QueryClientProvider>
  );
};

export default App;
