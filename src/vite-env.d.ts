/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME?: string;
  readonly VITE_I18N_DEBBUG?: 'true' | 'false';
  readonly VITE_VIA_STARWARS_BASE_URL?: string;
  readonly VITE_VIA_CEP_BASE_URL?: string;
  readonly PACKAGE_VERSION?: string;
  // add more env variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
