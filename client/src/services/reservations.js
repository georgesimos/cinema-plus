import api from '../utils/axios';

const getAuthHeader = () => {
  const token = localStorage.getItem('jwtToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Добавляем интерцептор для автоматического добавления токена
api.interceptors.request.use(config => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getReservations = () => {
  return api.get('/reservations');
};

export const deleteReservation = (id) => {
  return api.delete(`/reservations/${id}`);
};

export const addReservation = (reservationData) => {
  return api.post('/reservations', reservationData);
};

export const getSuggestedSeats = (movieId, cinemaId, date, startAt) => {
  return api.get(`/reservations/suggested-seats`, {
    params: { movieId, cinemaId, date, startAt }
  });
}; 