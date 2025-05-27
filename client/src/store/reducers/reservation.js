import { GET_RESERVATIONS, DELETE_RESERVATION } from '../types';

const initialState = {
  reservations: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RESERVATIONS:
      return {
        ...state,
        reservations: action.payload
      };
    case DELETE_RESERVATION:
      return {
        ...state,
        reservations: state.reservations.filter(
          reservation => reservation._id !== action.payload
        )
      };
    default:
      return state;
  }
}; 