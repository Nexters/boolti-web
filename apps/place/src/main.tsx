import { initAnalytics } from '@boolti/analytics';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

initAnalytics(import.meta.env.VITE_MIXPANEL_TOKEN, { debug: import.meta.env.DEV });

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
