import { SET_ALERT, REMOVE_ALERT } from '../types';

const initialState = {
  alerts: [],
  showAlert: false
};

const setAlert = (state, { payload }) => ({
  ...state,
  alerts: [...state.alerts, payload],
  showAlert: true
});

const removeAlert = (state, { payload }) => ({
  ...state,
  alerts: [...state.alerts].filter(alert => alert.id !== payload),
  showAlert: false
});

export default function(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case SET_ALERT:
      return setAlert(state, action);
    case REMOVE_ALERT:
      return removeAlert(state, action);
    default:
      return state;
  }
}
