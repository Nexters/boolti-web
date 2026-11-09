/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_API_URL: string;
  readonly VITE_IS_SUPER_ADMIN?: string;
  readonly VITE_MIXPANEL_TOKEN?: string;
  readonly VITE_MIXPANEL_DEV_TOKEN?: string;
  readonly VITE_MIXPANEL_PROD_TOKEN?: string;
  readonly VITE_MIXPANEL_MODE?: string;
  readonly VITE_MIXPANEL_DEBUG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
