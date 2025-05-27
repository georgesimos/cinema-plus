import axios from 'axios';
import { store } from '../store/index';
import { LOGOUT } from '../store/types';

// Создаем инстанс axios с базовой конфигурацией
const api = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Добавляем интерцептор запросов
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Добавляем интерцептор ответов
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Если получаем 401, очищаем данные авторизации
      if (error.response.status === 401) {
        // Проверяем, не является ли текущий URL страницей логина
        if (!window.location.hash.includes('/login')) {
          localStorage.removeItem('jwtToken');
          store.dispatch({ type: LOGOUT });
          window.location.href = '/login';
        }
      }

      // Возвращаем ошибку с сервера, если она есть
      if (error.response.data && (error.response.data.error || error.response.data.message)) {
        return Promise.reject({
          ...error,
          message: error.response.data.error || error.response.data.message
        });
      }
    }
    
    // Если нет ответа от сервера или другая ошибка
    return Promise.reject({
      ...error,
      message: error.message || 'Произошла неизвестная ошибка'
    });
  }
);

export default api; 