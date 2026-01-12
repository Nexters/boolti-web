/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_API_URL: string;
  readonly VITE_IS_SUPER_ADMIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
