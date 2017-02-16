import { ajax } from 'jquery';

export const GET_USER_DATA = 'GET_USER_DATA';

const getUserData = payload => ({
  type: GET_USER_DATA,
  data: payload
});

export const getUserDataAsync = () => (dispatch) => {
  ajax({
    url: '/api/users/1',
    type: 'GET'
  })
  .done((userData) => {
    dispatch(getUserData(userData));
  });
};

export const postUserDataAsync = () => (dispatch) => {
  ajax({
    url: '/api/users/',
    type: 'POST',
    data: {
      username: '',
      password: '',
      email: '',
      level: ''
    }
  })
  .done((userData) => {
    dispatch(getUserData(userData));
  });
};
