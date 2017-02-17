import { ajax } from 'jquery';

export const GET_DOCUMENT = 'GET_DOCUMENT';
<<<<<<< HEAD
export const EDIT_DOCUMENT_STATUS = 'EDIT_DOCUMENT_STATUS';
=======
export const SELECT_REVIEWER = 'SELECT_REVIEWER';
>>>>>>> 8feb532970f0de431a9551f8c90523b02fa8890d

const getDocument = payload => ({
  type: GET_DOCUMENT,
  data: payload
});

export const selectReviewer = reviewer => ({
  type: SELECT_REVIEWER,
  data: reviewer
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

const editDocumentStatus = payload => ({
  type: EDIT_DOCUMENT_STATUS,
  data: payload
});

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
