import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '~', replacement: '/src' }],
  },
  server: {
    port: 8082,
    host: 'localhost',
    // HTTPS가 필요한 경우 인증서 파일을 추가하고 아래 주석을 해제하세요
    // https: {
    //   key: './profile.dev.boolti.in-key.pem',
    //   cert: './profile.dev.boolti.in.pem',
    // },
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
