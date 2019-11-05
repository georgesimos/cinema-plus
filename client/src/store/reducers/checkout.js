import {
  SET_SELECTED_SEATS,
  SET_SELECTED_CINEMA,
  SET_SELECTED_TIME,
  TOGGLE_LOGIN_POPUP
} from '../types';

const initialState = {
  selectedSeats: 0,
  selectedCinema: '',
  selectedTime: '',
  showLoginPopup: false
};

export const setSelectedSeats = (state, selectedSeats) => ({
  ...state,
  selectedSeats
});

export const setSelectedCinema = (state, selectedCinema) => ({
  ...state,
  selectedCinema
});

export const setSelectedTime = (state, selectedTime) => ({
  ...state,
  selectedTime
});

export const toggleLoginPopup = state => ({
  ...state,
  showLoginPopup: !state.showLoginPopup
});

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SELECTED_SEATS:
      return setSelectedSeats(state, payload);
    case SET_SELECTED_CINEMA:
      return setSelectedCinema(state, payload);
    case SET_SELECTED_TIME:
      return setSelectedTime(state, payload);
    case TOGGLE_LOGIN_POPUP:
      return toggleLoginPopup(state);
    default:
      return state;
  }
}
