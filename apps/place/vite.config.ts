import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '~', replacement: '/src' }],
  },
  server: {
    port: 8080,
    // 로컬 개발 시 dev API의 CORS 제한을 우회하기 위한 프록시.
    // .env.local에서 VITE_BASE_API_URL을 비워두면 요청이 프록시를 타게 된다.
    proxy: {
      '/web': {
        target: 'https://dev.api.boolti.in',
        changeOrigin: true,
      },
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
