import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from '../types';
import { setAlert } from './alert';
import setAuthHeaders from '../../utils/setAuthHeaders';

// Login user
export const login = (username, password) => async dispatch => {
  try {
    const url = 'http://localhost:3001/users/login';
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const responseData = await response.json();
    if (response.ok) {
      dispatch({ type: LOGIN_SUCCESS, payload: responseData });
      dispatch(setAlert('LOGIN Success', 'success', 5000));
    }
    if (responseData.error) {
      dispatch({ type: LOGIN_FAIL });
      dispatch(setAlert(responseData.error.message, 'error', 5000));
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAIL });
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

// Register user
export const register = ({
  firstname,
  lastname,
  username,
  email,
  password
}) => async dispatch => {
  try {
    const url = 'http://localhost:3001/users';
    const body = { firstname, lastname, username, email, password };
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const responseData = await response.json();
    if (response.ok) {
      dispatch({ type: REGISTER_SUCCESS, payload: responseData });
      dispatch(setAlert('Register Success', 'success', 5000));
    }
    if (responseData._message) {
      dispatch({ type: REGISTER_FAIL });
      dispatch(setAlert(responseData._message, 'error', 5000));
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: REGISTER_FAIL });
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

// Load user
export const loadUser = () => async dispatch => {
  try {
    const url = 'http://localhost:3001/users/me';
    const response = await fetch(url, {
      method: 'GET',
      headers: setAuthHeaders()
    });
    const responseData = await response.json();
    console.log(responseData);
    if (response.ok) dispatch({ type: USER_LOADED, payload: responseData });
    if (!response.ok) dispatch({ type: AUTH_ERROR });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Logout
export const logout = () => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = 'http://localhost:3001/users/logout';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    await response.json();
    dispatch({ type: LOGOUT });
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};
