/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MIXPANEL_TOKEN?: string;
  readonly VITE_MIXPANEL_DEV_TOKEN?: string;
  readonly VITE_MIXPANEL_PROD_TOKEN?: string;
  readonly VITE_MIXPANEL_MODE?: string;
  readonly VITE_MIXPANEL_DEBUG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
