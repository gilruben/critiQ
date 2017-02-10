import { combineReducers } from 'redux';
import user from './user-reducer';
import browse from './browse-reducer';
import category from './category-reducer';

const mainReducer = combineReducers({
  user,
  browse,
  category,
});

export default mainReducer;
