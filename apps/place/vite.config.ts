import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '~', replacement: '/src' }],
  },
  server: {
    // 네이버 지도 등 boolti.in 도메인에 등록된 키/인증을 로컬에서 그대로 쓰기 위해
    // place.dev.boolti.in 호스트로 띄운다. (/etc/hosts에 127.0.0.1 매핑 필요)
    // dev API 호출은 .env.local의 VITE_BASE_API_URL(절대 URL)로 직접 나가며,
    // place.dev.boolti.in origin이 CORS allow-list에 등록되어 있어야 한다.
    port: 8083,
    cors: false,
    host: 'place.dev.boolti.in',
    https: {
      key: './place.dev.boolti.in-key.pem',
      cert: './place.dev.boolti.in.pem',
    },
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      // react-compiler는 place 소스에만 적용한다.
      // 워크스페이스 패키지(@boolti/*) 소스까지 변환하면 해당 패키지에
      // 선언되지 않은 react-compiler-runtime import가 주입되어 빌드가 깨진다.
      babel: (id) => ({
        plugins: id.includes('/apps/place/src')
          ? [
              // react-compiler must run before any other babel plugin
              ['babel-plugin-react-compiler', { target: '18' }],
              '@emotion/babel-plugin',
            ]
          : ['@emotion/babel-plugin'],
      }),
    }),
  ],
});
