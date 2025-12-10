import './index.css';
import 'the-new-css-reset/css/reset.css';
import 'swiper/css';

import { QueryClientProvider } from '@boolti/api';
import { BooltiUIProvider } from '@boolti/ui';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import ProfilePage from './pages/ProfilePage';
import NotFound from './components/Notfound';
import { ProfilePastShowsPage } from './pages/ProfilePastShowsPage';
import { ProfileVideosPage } from './pages/ProfileVideosPage';
import { ProfileLinkPage } from './pages/ProfileLinkPage';
import { Suspense } from 'react';

const App = () => {
  return (
    <QueryClientProvider>
      <BooltiUIProvider>
        <HelmetProvider>
          <Suspense fallback={null}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<NotFound />} />
                <Route path="/:userCode" element={<ProfilePage />} />
                <Route path="/:userCode/shows" element={<ProfilePastShowsPage />} />
                <Route path="/:userCode/videos" element={<ProfileVideosPage />} />
                <Route path="/:userCode/links" element={<ProfileLinkPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </Suspense>
        </HelmetProvider>
      </BooltiUIProvider>
    </QueryClientProvider>
  );
};

export default App;
