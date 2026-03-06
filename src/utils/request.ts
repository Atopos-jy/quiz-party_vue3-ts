import axios, { type AxiosResponse } from 'axios';

import { handleError } from '@/utils/error-handler';

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 5000,
});

request.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    handleError(error);
    return Promise.reject(error);
  }
);

export { request };
