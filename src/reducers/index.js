import { combineReducers } from 'redux';
import events from './events';
import auth from './auth';
import position from './position';

export default combineReducers({ events, auth, position });
