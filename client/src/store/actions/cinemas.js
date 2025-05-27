import { GET_CINEMAS, GET_CINEMA } from '../types';
import { setAlert } from './alert';

export const uploadCinemaImage = (id, image) => async dispatch => {
  try {
    const data = new FormData();
    data.append('file', image);
    const url = '/cinemas/photo/' + id;
    const response = await fetch(url, {
      method: 'POST',
      body: data
    });
    const responseData = await response.json();
    if (response.ok) {
      dispatch(setAlert('Изображение загружено', 'success', 5000));
      // Получаем обновленные данные зала
      await dispatch(getCinemas());
      return responseData;
    }
    if (responseData.error) {
      dispatch(setAlert(responseData.error.message, 'error', 5000));
    }
    return null;
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return null;
  }
};

export const getCinemas = () => async dispatch => {
  try {
    const url = '/cinemas';
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!response.ok) {
      throw new Error(`Ошибка загрузки кинотеатров: ${response.status}`);
    }
    
    const cinemas = await response.json();
      dispatch({ type: GET_CINEMAS, payload: cinemas });
    return cinemas;
  } catch (error) {
    console.error('Ошибка при загрузке кинотеатров:', error);
    dispatch(setAlert(error.message, 'error', 5000));
    throw error;
  }
};

export const getCinema = id => async dispatch => {
  try {
    const url = '/cinemas/' + id;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const cinema = await response.json();
    if (response.ok) {
      dispatch({ type: GET_CINEMA, payload: cinema });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const createCinemas = (image, newCinema) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/cinemas';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCinema)
    });
    const data = await response.json();
    
    if (response.ok) {
      dispatch(setAlert('Кинотеатр создан', 'success', 5000));
      if (image) dispatch(uploadCinemaImage(data._id, image));
      dispatch(getCinemas());
      return { status: 'success', message: 'Кинотеатр создан' };
    } else {
      const errorMessage = data.error || 'Кинотеатр не сохранен, попробуйте снова.';
      dispatch(setAlert(errorMessage, 'error', 5000));
      return { status: 'error', message: errorMessage };
    }
  } catch (error) {
    dispatch(
      setAlert(
        error.message || 'Кинотеатр не сохранен, попробуйте снова.',
        'error',
        5000
      )
    );
    return {
      status: 'error',
      message: 'Кинотеатр не сохранен, попробуйте снова.'
    };
  }
};

export const updateCinemas = (image, cinema, id) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/cinemas/' + id;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cinema)
    });
    const data = await response.json();
    
    if (response.ok) {
      dispatch(setAlert('Кинотеатр обновлен', 'success', 5000));
      if (image) dispatch(uploadCinemaImage(id, image));
      dispatch(getCinemas());
      return { status: 'success', message: 'Кинотеатр обновлен' };
    } else {
      const errorMessage = data.error || 'Кинотеатр не обновлен, попробуйте снова.';
      dispatch(setAlert(errorMessage, 'error', 5000));
      return { status: 'error', message: errorMessage };
    }
  } catch (error) {
    dispatch(
      setAlert(
        error.message || 'Кинотеатр не обновлен, попробуйте снова.',
        'error',
        5000
      )
    );
    return {
      status: 'error',
      message: 'Кинотеатр не обновлен, попробуйте снова.'
    };
  }
};

export const removeCinemas = id => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/cinemas/' + id;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      dispatch(setAlert('Кинотеатр удален', 'success', 5000));
      await dispatch(getCinemas());
      return { status: 'success', message: 'Кинотеатр удален' };
    } else {
      const errorMessage = 'Кинотеатр не удален, попробуйте снова.';
      dispatch(setAlert(errorMessage, 'error', 5000));
      return { status: 'error', message: errorMessage };
    }
  } catch (error) {
    dispatch(
      setAlert(
        error.message || 'Кинотеатр не удален, попробуйте снова.',
        'error',
        5000
      )
    );
    return {
      status: 'error',
      message: 'Кинотеатр не удален, попробуйте снова.'
    };
  }
};

export const getCinemasUserModeling = username => async dispatch => {
  try {
    const url = '/cinemas/usermodeling/' + username;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const cinemas = await response.json();
    if (response.ok) {
      dispatch({ type: GET_CINEMAS, payload: cinemas });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};
