import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8081,
    host: 'preview.dev.boolti.in',
    https: {
      key: './preview.dev.boolti.in-key.pem',
      cert: './preview.dev.boolti.in.pem',
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
