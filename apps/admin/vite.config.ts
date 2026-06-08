import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const isE2EMsw = process.env.VITE_E2E_MSW === 'true';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    exclude: ['e2e/**'],
  },
  resolve: {
    alias: [{ find: '~', replacement: '/src' }],
  },
  server: {
    port: 8080,
    cors: false,
    host: isE2EMsw ? '127.0.0.1' : 'dev.boolti.in',
    https: isE2EMsw
      ? undefined
      : {
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
