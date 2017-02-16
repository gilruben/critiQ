import { combineReducers } from 'redux';
import user from './user-reducer';
import browse from './browse-reducer';
import document from './document-reducer';

const mainReducer = combineReducers({
  user,
  browse,
  document
});

export default mainReducer;
