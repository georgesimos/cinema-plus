import { GET_CINEMAS } from '../types';

const initialState = {
  cinemas: []
};

const getCinemas = (state, payload) => ({
  ...state,
  cinemas: payload
});

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CINEMAS:
      return getCinemas(state, payload);
    default:
      return state;
  }
};
