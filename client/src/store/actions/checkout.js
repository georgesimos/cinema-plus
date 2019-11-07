import {
  SET_SELECTED_SEATS,
  SET_SELECTED_CINEMA,
  SET_SELECTED_TIME,
  SET_INVITATION,
  TOGGLE_LOGIN_POPUP,
  SHOW_INVITATION_FORM,
  RESET_CHECKOUT
} from '../types';

export const setSelectedSeats = seats => ({
  type: SET_SELECTED_SEATS,
  payload: seats
});

export const setSelectedCinema = cinema => ({
  type: SET_SELECTED_CINEMA,
  payload: cinema
});
export const setSelectedTime = time => ({
  type: SET_SELECTED_TIME,
  payload: time
});
export const setInvitation = event => ({
  type: SET_INVITATION,
  payload: event
});

export const toggleLoginPopup = () => ({ type: TOGGLE_LOGIN_POPUP });
export const showInvitationForm = () => ({ type: SHOW_INVITATION_FORM });
export const resetCheckout = () => ({ type: RESET_CHECKOUT });
