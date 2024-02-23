import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '~', replacement: '/src' }],
  },
  server: {
    port: 8080,
    cors: false,
    host: 'dev.boolti.in',
    https: {
      key: './dev.boolti.in-key.pem',
      cert: './dev.boolti.in.pem',
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
