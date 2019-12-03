import {
  SET_SELECTED_SEATS,
  SET_SELECTED_CINEMA,
  SET_SELECTED_DATE,
  SET_SELECTED_TIME,
  TOGGLE_LOGIN_POPUP,
  SHOW_INVITATION_FORM,
  RESET_CHECKOUT,
  SET_INVITATION,
  SET_SUGGESTED_SEATS
} from '../types';

const initialState = {
  selectedSeats: [],
  suggestedSeat: [],
  selectedCinema: '',
  selectedDate: null,
  selectedTime: '',
  showLoginPopup: false,
  showInvitation: false,
  invitations: {}
};

const setSelectedSeats = (state, seats) => {
  let newSeats = [];
  const seatExist = state.selectedSeats.find(
    seat => JSON.stringify(seat) === JSON.stringify(seats)
  );
  !seatExist
    ? (newSeats = [...state.selectedSeats, seats])
    : (newSeats = state.selectedSeats.filter(
        seat => JSON.stringify(seat) !== JSON.stringify(seats)
      ));

  return {
    ...state,
    selectedSeats: newSeats
  };
};

const setSuggestedSeats = (state, seats) => {
  let newSeats = [];

  newSeats = [...state.suggestedSeat,seats];

  return {
    ...state,
    suggestedSeat: newSeats
  };
};

const setSelectedCinema = (state, selectedCinema) => ({
  ...state,
  selectedCinema
});
const setSelectedDate = (state, selectedDate) => ({
  ...state,
  selectedDate
});

const setSelectedTime = (state, selectedTime) => ({
  ...state,
  selectedTime
});

const setInvitation = (state, event) => {
  return {
    ...state,
    invitations: {
      ...state.invitations,
      [event.target.name]: event.target.value
    }
  };
};

const toggleLoginPopup = state => ({
  ...state,
  showLoginPopup: !state.showLoginPopup
});
const showInvitationForm = state => ({
  ...state,
  showInvitation: !state.showInvitation
});
const resetCheckout = () => initialState;

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SELECTED_SEATS:
      return setSelectedSeats(state, payload);
      case SET_SUGGESTED_SEATS:
      return setSuggestedSeats(state, payload);
    case SET_SELECTED_CINEMA:
      return setSelectedCinema(state, payload);
    case SET_SELECTED_DATE:
      return setSelectedDate(state, payload);
    case SET_SELECTED_TIME:
      return setSelectedTime(state, payload);
    case SET_INVITATION:
      return setInvitation(state, payload);
    case TOGGLE_LOGIN_POPUP:
      return toggleLoginPopup(state);
    case SHOW_INVITATION_FORM:
      return showInvitationForm(state);
    case RESET_CHECKOUT:
      return resetCheckout();
    default:
      return state;
  }
}
