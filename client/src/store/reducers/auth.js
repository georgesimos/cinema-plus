import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from '../types';

const initialState = {
  token: localStorage.getItem('jwtToken'),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return { ...state, user: payload, isAuthenticated: true, loading: false };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('jwtToken', payload.token);
      return { ...state, ...payload, isAuthenticated: true, loading: false };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('jwtToken');
      return initialState;
    default:
      return state;
  }
};
