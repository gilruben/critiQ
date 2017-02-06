import { GET_USER_DATA } from '../actions/user-actions';

const defaultState = { username: '', email: '', bio: '', rating: 0, level: '' };

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

module.exports = reducer;
