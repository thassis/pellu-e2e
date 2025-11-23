import axios from 'axios';
import { UserStorage } from '../asyncStorage/user.storage';
import { env } from '../env';
// import RNRestart from 'react-native-restart';
import { showAlert } from '@/utils/Alert';

const api = axios.create({
  baseURL: env.URL_SERVER,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let jwt_token: string | undefined;

export const initAxiosJwtToken = async () => {
  const user = await UserStorage.get();
  jwt_token = user?.token;
};

export const setAxiosJwtToken = (token: string) => {
  jwt_token = token;
};

export const cleanAxiosJwtToken = () => {
  jwt_token = undefined;
};

api.interceptors.request.use(
  async config => {
    if (jwt_token) {
      config.headers.Authorization = `Bearer ${jwt_token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    console.error('Error response data:', error);
    if (error.response && error.response.status === 401) {
      await UserStorage.clear();
      // RNRestart.restart();
      showAlert("Sessão expirada", "Seu app foi reiniciado. Por favor, faça login novamente.");
    }
    return Promise.reject(error);
  },
);

export default api;
