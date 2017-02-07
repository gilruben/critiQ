import { GET_DOCUMENTS_DATA } from '../actions/browse-actions';

const defaultState = { documents: [], category: '' };

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_DOCUMENTS_DATA:
      return Object.assign({}, state, { documents: action.data });
    default:
      return state;
  }
};

module.exports = reducer;
