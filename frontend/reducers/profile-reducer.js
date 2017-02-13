import { GET_PROFILE_DATA } from '../actions/profile-actions';

const defaultState = { profileData: {} };

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_PROFILE_DATA:
      return Object.assing({}, state, action.data);
    default:
      return state;
  }
};

export default reducer;
