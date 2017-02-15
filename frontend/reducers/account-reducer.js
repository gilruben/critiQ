import { GET_USER_ACCOUNT, EDIT_USER_ACCOUNT } from '../actions/user-actions';

const defaultState = { account: null };

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_USER_ACCOUNT:
      return Object.assign({}, state, { account: action.data });
    case EDIT_USER_ACCOUNT:
      return Object.assign({}, state, { account: action.data });
    default:
      return state;
  }
};

module.exports = reducer;
