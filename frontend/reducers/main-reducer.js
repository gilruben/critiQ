import { combineReducers } from 'redux';
import user from './user-reducer';
import browse from './browse-reducer';
import category from './category-reducer';
import document from './document-reducer';

const mainReducer = combineReducers({
  user,
  browse,
  category,
  document
});

export default mainReducer;
