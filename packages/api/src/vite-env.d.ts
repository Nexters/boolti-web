/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KAKAO_REST_API_KEY: string;
  readonly VITE_BASE_API_URL: string;
  readonly IS_SUPER_ADMIN: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
