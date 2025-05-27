import { GET_RESERVATIONS, GET_RESERVATION_SUGGESTED_SEATS, DELETE_RESERVATION } from '../types';

const initialState = {
  reservations: [],
  suggestedSeats: []
};

const getReservations = (state, payload) => ({
  ...state,
  reservations: payload
});

const getReservationSuggestedSeats = (state, payload) => ({
  ...state,
  suggestedSeats: payload
});

const deleteReservation = (state, payload) => ({
  ...state,
  reservations: state.reservations.filter(reservation => reservation._id !== payload)
});

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_RESERVATIONS:
      return getReservations(state, payload);
    case GET_RESERVATION_SUGGESTED_SEATS:
      return getReservationSuggestedSeats(state, payload);
    case DELETE_RESERVATION:
      return deleteReservation(state, payload);
    default:
      return state;
  }
};
