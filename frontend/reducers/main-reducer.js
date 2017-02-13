import { combineReducers } from 'redux';
import user from './user-reducer';
import browse from './browse-reducer';

const mainReducer = combineReducers({
  user,
  browse
});

export default mainReducer;
