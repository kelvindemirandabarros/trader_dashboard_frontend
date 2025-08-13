import axios from 'axios';

// Consts:
import { backend_url, storage_user_string } from '@/consts/App';

if (!backend_url) {
  throw new Error('Variável backend_url não foi definida.');
}

const api = axios.create({
  baseURL: backend_url + '/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// Interceptor para adicionar o token nas requisições
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem(storage_user_string);

    const user_json = user ? JSON.parse(user) : '';

    if (user_json.token) {
      config.headers.Authorization = `Bearer ${user_json.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta:
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
