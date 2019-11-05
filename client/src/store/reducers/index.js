import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import users from './users';
import movies from './movies';
import cinemas from './cinemas';
import reservations from './reservations';
import showtimes from './showtimes';
import checkout from './checkout';

export default combineReducers({
  alertState: alert,
  authState: auth,
  userState: users,
  movieState: movies,
  cinemaState: cinemas,
  reservationState: reservations,
  showtimeState: showtimes,
  checkoutState: checkout
});
