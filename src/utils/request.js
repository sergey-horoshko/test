import axios from 'axios';
import { getToken, removeToken } from '@/utils/auth';
import { toastError } from '@/utils/toast';

const BASE_API = import.meta.env.VITE_BASE_API;

const service = axios.create({
  baseURL: BASE_API,
});

service.interceptors.request.use(
  (config) => {
    const conf = config;

    if (conf?.formData) {
      conf.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    } else {
      conf.headers['Content-Type'] = 'application/json;charset=utf-8';
    }

    const token = getToken();

    if (token) {
      conf.headers.Authorization = `Bearer ${token}`;
    }

    return conf;
  },
  (error) => {
    toastError();

    Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { response } = error;

    if (response) {
      if (response?.status === 400) {
        const { errors } = response.data;

        toastError({ title: 'Ошибка', body: errors });
      }

      // client received an error response (5xx, 4xx)
      if (response?.status === 401) {
        const r = response?.data;

        toastError();

        if (getToken()) {
          removeToken();

          document.location.reload();
        }

        return Promise.reject(r);
      }

      if (response?.status <= 500) {
        console.log(response);

        const r = response?.data;

        toastError({ title: 'Ошибка', body: 'Произошла ошибка, свяжитесь с администратором' });

        return Promise.reject(new Error(r));
      }
    }

    return Promise.reject(new Error(response));
  },
);

export { BASE_API };

export default service;
