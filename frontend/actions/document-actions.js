import { ajax } from 'jquery';

export const GET_DOCUMENT = 'GET_DOCUMENT';
export const EDIT_DOCUMENT_STATUS = 'EDIT_DOCUMENT_STATUS';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const SELECT_REVIEWER = 'SELECT_REVIEWER';
export const SELECT_COMMENT = 'SELECT_COMMENT';

const getDocument = payload => ({
  type: GET_DOCUMENT,
  data: payload
});

const editDocumentStatus = payload => ({
  type: EDIT_DOCUMENT_STATUS,
  data: payload
});

const createComment = payload => ({
  type: CREATE_COMMENT,
  data: payload
});

const deleteComment = payload => ({
  type: DELETE_COMMENT,
  data: payload
});

export const selectReviewer = reviewer => ({
  type: SELECT_REVIEWER,
  data: reviewer
});

export const selectComment = commentId => ({
  type: SELECT_COMMENT,
  data: commentId
});

export const getDocumentAsync = id => (dispatch) => {
  ajax({
    url: `/api/documents/${id}`,
    type: 'GET'
  })
  .done((data) => {
    dispatch(getDocument(data));
  });
};

export const editDocumentStatusAsync = (data, id) => (dispatch) => {
  ajax({
    url: `/api/documents/${id}`,
    type: 'PUT',
    data
  })
  .done((documentData) => {
    dispatch(editDocumentStatus(documentData));
  });
};

export const createCommentAsync = commentData => (dispatch) => {
  ajax({
    url: '/api/comments',
    type: 'POST',
    data: commentData
  })
  .done((comment) => {
    dispatch(createComment(comment));
  });
};

export const deleteCommentAsync = id => (dispatch) => {
  ajax({
    url: `/api/comments/${id}`,
    type: 'DELETE'
  })
  .done(() => {
    dispatch(deleteComment(id));
  });
};
