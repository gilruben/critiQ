import { GET_CATEGORY_DATA } from '../actions/category-actions';

const defaultState = { };

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_CATEGORY_DATA:
      return Object.assign({}, state, { documents: action.data });
    default:
      return state;
  }
};

module.exports = reducer;
