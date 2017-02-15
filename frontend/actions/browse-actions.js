import { ajax } from 'jquery';

const categories = {
  essays: 'essay',
  resumes: 'resume',
  cover_letters: 'cover_letter',
  other_writings: 'other_writing'
};

const levels = {
  middle_school: 'middle_school',
  high_school: 'high_school',
  college: 'college',
  other: 'other'
};

export const GET_DOCUMENTS_DATA = 'GET_DOCUMENTS_DATA';

const getDocuments = payload => ({
  type: GET_DOCUMENTS_DATA,
  data: payload,
});

export const getDocumentsAsync = (category, level) => (dispatch) => {
  let url = '/api/documents';
  url += categories[category] ? `?category=${categories[category]}` : '';
  url += levels[level] ? `&level=${levels[level]}` : '';

  ajax({
    url,
    type: 'GET'
  })
  .done((data) => {
    dispatch(getDocuments(data));
  });
};
