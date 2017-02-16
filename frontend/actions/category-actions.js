import { ajax } from 'jquery';

export const GET_CATEGORY_DATA = 'GET_CATEGORY_DATA';

const getCategory = payload => ({
  type: GET_CATEGORY_DATA,
  data: payload
});

export const getCategoryAsync = () => (dispatch) => {
  ajax({
    url: '/api/documents?category=',
    // 'essay''level=''jr-high'
    type: 'GET'
  })
  .done((categoryData) => {
    dispatch(getCategory(categoryData));
  });
};
