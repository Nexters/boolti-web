import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '~', replacement: '/src' }],
  },
  server: {
    port: 8081,
    host: 'dev.profile.boolti.in',
    https: {
      key: './dev.profile.boolti.in-key.pem',
      cert: './dev.profile.boolti.in.pem',
    },
    proxy: {
      '/api': {
        target: 'https://dev.api.boolti.in',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
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
