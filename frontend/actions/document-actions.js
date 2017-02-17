import { ajax } from 'jquery';

export const GET_DOCUMENT = 'GET_DOCUMENT';
export const EDIT_DOCUMENT_STATUS = 'EDIT_DOCUMENT_STATUS';
export const SELECT_REVIEWER = 'SELECT_REVIEWER';

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
