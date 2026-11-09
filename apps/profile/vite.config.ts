import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '~', replacement: '/src' }],
  },
  server: {
    port: 8081,
    host: 'profile.dev.boolti.in',
    https: {
      key: './profile.dev.boolti.in-key.pem',
      cert: './profile.dev.boolti.in.pem',
    },
    proxy: {
      '/api': {
        target: 'https://dev.api.boolti.in',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // Mixpanel 쿠키(mp_*)가 실리면 dev API 의 WAF 가 403 으로 막는다. 인증은 헤더라 쿠키는 필요 없다
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => proxyReq.removeHeader('cookie'));
        },
        secure: true,
      },
    },
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
});
