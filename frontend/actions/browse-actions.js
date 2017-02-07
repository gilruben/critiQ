import { ajax } from 'jquery';

export const GET_DOCUMENTS_DATA = 'GET_DOCUMENTS_DATA';

const getDocumentsData = payload => ({
  type: GET_DOCUMENTS_DATA,
  data: payload,
});

export const getDocumentsAsync = () => (dispatch) => {
  ajax({
    url: '/api/documents',
    type: 'GET',
  })
  .done((userData) => {
    dispatch(getDocumentsData(userData));
  });
};
