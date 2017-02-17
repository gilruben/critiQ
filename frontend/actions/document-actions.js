import { ajax } from 'jquery';

export const GET_DOCUMENT = 'GET_DOCUMENT';
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
