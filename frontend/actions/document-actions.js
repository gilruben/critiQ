import { ajax } from 'jquery';

export const GET_DOCUMENT = 'GET_DOCUMENT';

const getDocument = payload => ({
  type: GET_DOCUMENT,
  data: payload
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
