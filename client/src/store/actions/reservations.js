import { GET_RESERVATIONS, GET_RESERVATION_SUGGESTED_SEATS, DELETE_RESERVATION } from '../types';
import { setAlert } from './alert';
import api from '../../utils/axios';

export const getReservations = () => async dispatch => {
  try {

    const response = await api.get('/reservations');
    if (response.data) { 
      dispatch({ type: GET_RESERVATIONS, payload: response.data });

    }
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Не удалось загрузить бронирования';
    dispatch(setAlert(errorMessage, 'error', 5000));
  }
};

export const getSuggestedReservationSeats = username => async dispatch => {
  try {
    const response = await api.get(`/reservations/usermodeling/${username}`);
    if (response.data) {
      dispatch({
        type: GET_RESERVATION_SUGGESTED_SEATS,
        payload: response.data
      });
    }
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Не удалось получить рекомендации по местам';
    dispatch(setAlert(errorMessage, 'error', 5000));
  }
};

export const addReservation = reservation => async dispatch => {
  try {
    const response = await api.post('/reservations', reservation);
    if (response.data) {
      const { reservation, QRCode } = response.data;
      dispatch(setAlert('Бронирование создано', 'success', 5000));
      return {
        status: 'success',
        message: 'Бронирование создано',
        data: { reservation, QRCode }
      };
    }
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Не удалось создать бронирование';
    dispatch(setAlert(errorMessage, 'error', 5000));
    return {
      status: 'error',
      message: errorMessage
    };
  }
};

export const updateReservation = (reservation, id) => async dispatch => {
  try {
    const response = await api.patch(`/reservations/${id}`, reservation);
    if (response.data) {
      dispatch(setAlert('Бронирование обновлено', 'success', 5000));
      return { 
        status: 'success', 
        message: 'Бронирование обновлено',
        data: response.data 
      };
    }
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Не удалось обновить бронирование';
    dispatch(setAlert(errorMessage, 'error', 5000));
    return {
      status: 'error',
      message: errorMessage
    };
  }
};

export const removeReservation = id => async dispatch => {
  try {
    const response = await api.delete(`/reservations/${id}`);
    
    if (response.data) {
      dispatch(setAlert('Бронирование успешно удалено', 'success', 5000));
      dispatch(getReservations());
      return { 
        status: 'success', 
        message: 'Бронирование удалено',
        data: response.data 
      };
    }
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Не удалось удалить бронирование';
    dispatch(setAlert(errorMessage, 'error', 5000));
    return {
      status: 'error',
      message: errorMessage
    };
  }
};


export {
  getReservations,
  deleteReservation,
  addReservation,
  getSuggestedReservationSeats
} from './reservation';

