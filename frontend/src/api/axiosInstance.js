import axios from 'axios';
import { API_URL } from '../config';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});


api.interceptors.request.use(
  (config) => {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}]${config.method?.toUpperCase()} ${config.url}`, config.data ?? '');
    return config;
  },
  (error) => Promise.reject(error),
);


api.interceptors.response.use(
  (response) => {
    console.log(`${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`${error.response.status} ${error.config?.url}`, error.response.data);
    } else if (error.request) {
      console.error('Tidak ada respons dari server (backend mati?)');
    } else {
      console.error('Kesalahan saat membuat request:', error.message);
    }
    return Promise.reject(error);
  },
);

export default api;
