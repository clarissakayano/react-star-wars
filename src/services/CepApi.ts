import axios from 'axios';

import Config from 'Config';

const cepApi = axios.create({
  baseURL: Config.api.baseUrl,
});

export default cepApi;
