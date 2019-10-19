import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import movies from './movies';
import cinemas from './cinemas';

export default combineReducers({
  alertState: alert,
  authState: auth,
  movieState: movies,
  cinemasState: cinemas
});
