const Config = {
  api: {
    baseUrl: import.meta.env.VITE_VIA_CEP_BASE_URL ?? '',
  },

  app: {
    name: import.meta.env.VITE_APP_NAME,
    version: import.meta.env.PACKAGE_VERSION,
  },
  i18n: {
    debbug: JSON.parse(
      (import.meta.env.VITE_I18N_DEBBUG ?? 'false').toLocaleLowerCase(),
    ),
  },
};

export default Config;
