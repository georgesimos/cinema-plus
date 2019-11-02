import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import movies from './movies';
import cinemas from './cinemas';
import reservations from './reservations';
import showtimes from './showtimes';

export default combineReducers({
  alertState: alert,
  authState: auth,
  movieState: movies,
  cinemasState: cinemas,
  reservationsState: reservations,
  showtimesState: showtimes
});
