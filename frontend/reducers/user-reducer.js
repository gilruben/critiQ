import { GET_USER_DATA, EDIT_USER_DATA } from '../actions/user-actions';

const defaultState = { id: null, username: '', email: '', bio: '', rating: 0, level: '', documents: [] };

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      let { id, username, email, bio, rating, level } = action.data;
      const documents = action.data.Documents;

      return Object.assign({}, state, { id, username, email, bio, rating, level, documents });
    case EDIT_USER_DATA:
      username = action.data.username;
      email = action.data.email;
      bio = action.data.bio;
      level = action.data.level;

      return Object.assign({}, state, { username, email, bio, level });
    default:
      return state;
  }
};

module.exports = reducer;
