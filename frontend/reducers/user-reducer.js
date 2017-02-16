import { GET_USER_DATA, EDIT_USER_DATA } from '../actions/user-actions';
import { EDIT_DOCUMENT_STATUS } from '../actions/document-actions';

const defaultState = { id: null, username: '', email: '', bio: '', rating: 0, level: '', documents: [] };

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      const { rating } = action.data;
      let { id, username, email, bio, level } = action.data;
      let documents = action.data.Documents;

      return Object.assign({}, state, { id, username, email, bio, rating, level, documents });
    case EDIT_USER_DATA:
      username = action.data.username;
      email = action.data.email;
      bio = action.data.bio;
      level = action.data.level;

      return Object.assign({}, state, { username, email, bio, level });
    case EDIT_DOCUMENT_STATUS:
      documents = state.documents;
      id = action.data.id;

      const newDocs = documents.map(doc => (
        (doc.id === id) ? action.data : doc
      ));

      return Object.assign({}, state, { documents: newDocs });
    default:
      return state;
  }
};

module.exports = reducer;
