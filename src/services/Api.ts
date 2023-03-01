import axios from 'axios';

import Config from 'Config';

const Api = axios.create({
  baseURL: 'https://swapi.dev/api/',
});

Api.interceptors.request.use((config) => {
  return {
    ...config,
    params: {
      ...config.params,
    },
  };
});

export default Api;
