import { DELETE_RESERVATION, GET_RESERVATIONS, GET_RESERVATION_SUGGESTED_SEATS } from '../types';
import {
  deleteReservation as deleteReservationService,
  getReservations as getReservationsService,
  addReservation as addReservationService,
  getSuggestedSeats as getSuggestedSeatsService
} from '../../services/reservations';

export const getReservations = () => async dispatch => {
  try {
    const response = await getReservationsService();
    dispatch({
      type: GET_RESERVATIONS,
      payload: response.data
    });
    return { status: 'success', data: response.data };
  } catch (error) {
    console.log(error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Ошибка при получении бронирований'
    };
  }
};

export const deleteReservation = (id) => async dispatch => {
  try {
    const response = await deleteReservationService(id);
    
    if (response.data) {
      dispatch({
        type: DELETE_RESERVATION,
        payload: id
      });
      // После успешного удаления обновляем список бронирований
      await dispatch(getReservations());
      return { 
        status: 'success', 
        message: 'Бронирование успешно удалено',
        data: response.data 
      };
    }
  } catch (error) {
    console.error('Ошибка при удалении бронирования:', error);
    
    // Проверяем тип ошибки
    if (error.response) {
      // Если есть ответ от сервера с ошибкой
      const errorMessage = error.response.data?.error || error.response.data?.message || 'Ошибка при удалении бронирования';
      
      if (error.response.status === 401) {
        return { 
          status: 'error', 
          message: 'Необходимо войти в систему заново' 
        };
      }
      
      if (error.response.status === 403) {
        return { 
          status: 'error', 
          message: 'У вас нет прав на удаление этой брони' 
        };
      }
      
      return { 
        status: 'error', 
        message: errorMessage
      };
    }
    
    // Если ошибка связана с сетью или другая
    return { 
      status: 'error', 
      message: error.message || 'Ошибка соединения с сервером' 
    };
  }
};

export const addReservation = (reservationData) => async dispatch => {
  try {
    const response = await addReservationService(reservationData);
    if (response.data) {
      await dispatch(getReservations());
      return { 
        status: 'success', 
        message: 'Бронирование успешно создано',
        data: response.data 
      };
    }
  } catch (error) {
    console.error('Ошибка при создании бронирования:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Ошибка при создании бронирования'
    };
  }
};

export const getSuggestedReservationSeats = (movieId, cinemaId, date, startAt) => async dispatch => {
  try {
    const response = await getSuggestedSeatsService(movieId, cinemaId, date, startAt);
    if (response.data) {
      dispatch({
        type: GET_RESERVATION_SUGGESTED_SEATS,
        payload: response.data
      });
      return { status: 'success', data: response.data };
    }
  } catch (error) {
    console.error('Ошибка при получении рекомендуемых мест:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Ошибка при получении рекомендуемых мест'
    };
  }
};