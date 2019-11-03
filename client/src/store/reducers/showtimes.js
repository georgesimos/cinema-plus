import {
  GET_SHOWTIMES,
  TOGGLE_DIALOG,
  SELECT_SHOWTIMES,
  SELECT_ALL_SHOWTIMES,
  DELETE_SHOWTIME
} from '../types';

const initialState = {
  showtimes: [],
  selectedShowtimes: [],
  openDialog: false
};

const getShowtimes = (state, payload) => ({
  ...state,
  showtimes: payload
});

const toggleDialog = state => ({
  ...state,
  openDialog: !state.openDialog
});

const selectShowtime = (state, payload) => {
  const { selectedShowtimes } = state;

  const selectedIndex = selectedShowtimes.indexOf(payload);
  let newSelected = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selectedShowtimes, payload);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selectedShowtimes.slice(1));
  } else if (selectedIndex === selectedShowtimes.length - 1) {
    newSelected = newSelected.concat(selectedShowtimes.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selectedShowtimes.slice(0, selectedIndex),
      selectedShowtimes.slice(selectedIndex + 1)
    );
  }

  return {
    ...state,
    selectedShowtimes: newSelected
  };
};

const selectAllShowtimes = state => ({
  ...state,
  selectedShowtimes: !state.selectedShowtimes.length
    ? state.showtimes.map(showtime => showtime._id)
    : []
});

const deleteShowtime = (state, payload) => ({
  ...state,
  selectedShowtimes: state.selectedShowtimes.filter(
    element => element !== payload
  )
});

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SHOWTIMES:
      return getShowtimes(state, payload);
    case TOGGLE_DIALOG:
      return toggleDialog(state);
    case SELECT_SHOWTIMES:
      return selectShowtime(state, payload);
    case SELECT_ALL_SHOWTIMES:
      return selectAllShowtimes(state);
    case DELETE_SHOWTIME:
      return deleteShowtime(state, payload);
    default:
      return state;
  }
};
