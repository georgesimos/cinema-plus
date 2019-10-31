import { GET_RESERVATIONS } from '../types';

const initialState = {
  reservations: []
};

const getReservations = (state, payload) => ({
  ...state,
  reservations: payload
});

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_RESERVATIONS:
      return getReservations(state, payload);
    default:
      return state;
  }
};
