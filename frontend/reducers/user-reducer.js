import { GET_USER_DATA, CREATE_DOCUMENT, EDIT_USER_DATA, LOGOUT } from '../actions/user-actions';
import { EDIT_DOCUMENT_STATUS } from '../actions/document-actions';

const defaultState = { username: '', email: '', bio: '', rating: 0, level: '', documents: [] };

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      const { rating } = action.data;
      let { username, email, bio, level } = action.data;
      let documents = action.data.Documents;

      return Object.assign({}, state, { username, email, bio, rating, level, documents });
    case CREATE_DOCUMENT:
      const newDocument = action.data;
      documents = state.documents;

      return Object.assign({}, state, { documents: [...documents, newDocument] });
    case EDIT_USER_DATA:
      username = action.data.username;
      email = action.data.email;
      bio = action.data.bio;
      level = action.data.level;

      return Object.assign({}, state, { username, email, bio, level });
    case EDIT_DOCUMENT_STATUS:
      documents = state.documents;
      const docId = action.data.id;

      const newDocs = documents.map(doc => (
        (doc.id === docId) ? action.data : doc
      ));

      return Object.assign({}, state, { documents: newDocs });
    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
};

module.exports = reducer;
