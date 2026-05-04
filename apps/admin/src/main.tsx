import ReactDOM from 'react-dom/client';

import App from './App';

const bootstrap = async () => {
  const enableE2EMSW = (window as Window & { __ENABLE_E2E_MSW__?: boolean }).__ENABLE_E2E_MSW__ === true;
  if (enableE2EMSW) {
    const { worker } = await import('./mocks/browser');
    void worker
      .start({
        onUnhandledRequest: 'bypass',
        serviceWorker: { url: '/mockServiceWorker.js' },
      })
      .then(() => {
        window.__E2E_MSW_READY__ = true;
      })
      .catch(() => {
        window.__E2E_MSW_READY__ = false;
      });
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
};

void bootstrap();
