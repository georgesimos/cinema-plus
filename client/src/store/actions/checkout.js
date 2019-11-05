import {
  SET_SELECTED_SEATS,
  SET_SELECTED_CINEMA,
  SET_SELECTED_TIME,
  TOGGLE_LOGIN_POPUP
} from '../types';

export const setSelectedSeats = number => ({
  type: SET_SELECTED_SEATS,
  payload: number
});

export const setSelectedCinema = cinema => ({
  type: SET_SELECTED_CINEMA,
  payload: cinema
});
export const setSelectedTime = time => ({
  type: SET_SELECTED_TIME,
  payload: time
});

export const toggleLoginPopup = () => ({ type: TOGGLE_LOGIN_POPUP });
