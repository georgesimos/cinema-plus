import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
export default combineReducers({ alertState: alert, authState: auth });
