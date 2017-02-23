import { GET_DOCUMENT, SELECT_REVIEWER, DELETE_COMMENT,
  CREATE_COMMENT, SELECT_COMMENT } from '../actions/document-actions';

const defaultState = {
  title: '',
  body: null,
  category: '',
  privacy: '',
  deadline: new Date(),
  active: '',
  createdAt: new Date(),
  comments: [],
  selectedReviewer: '',
  selectedComment: 0
};

const reducer = (state = defaultState, action) => {
  let comments = [];

  switch (action.type) {
    case GET_DOCUMENT:
      const { title, body, category, privacy, deadline, active, createdAt } = action.data;

      comments = action.data.Comments.sort((a, b) => a.id - b.id);

      // When contentState was originally converted to raw, entityMap was empty,
      // so the database omitted it.
      // Body can not be converted back to contentState without this property,
      // so it is manually added below.
      body.entityMap = {};

      return Object.assign({}, state, {
        title,
        body,
        category,
        privacy,
        deadline,
        active,
        createdAt,
        comments
      });
    case SELECT_REVIEWER:
      const selectedReviewer = action.data;

      return Object.assign({}, state, { selectedReviewer });
    case DELETE_COMMENT:
      const deletedCommentId = action.data;

      comments = state.comments.filter(comment => comment.id !== deletedCommentId);

      return Object.assign({}, state, { comments });
    case CREATE_COMMENT:
      const newComment = action.data;
      comments = state.comments;

      return Object.assign({}, state, { comments: [...comments, newComment] });
    case SELECT_COMMENT:
      const { commentId } = action.data;

      return Object.assign({}, state, { selectedComment: commentId });
    default:
      return state;
  }
};

export default reducer;
