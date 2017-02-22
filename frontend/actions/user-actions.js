import { ajax } from 'jquery';
import { browserHistory } from 'react-router';

export const GET_USER_DATA = 'GET_USER_DATA';

const getUserData = payload => ({
  type: GET_USER_DATA,
  data: payload
});

export const getUserDataAsync = username => (dispatch) => {
  ajax({
    url: '/auth/login/',
    type: 'POST',
    data: username
  })
  .done((userData) => {
    console.log(userData);
    dispatch(getUserData(userData));
    browserHistory.push('/');
  });
};

export const createUserAsync = userInfo => (dispatch) => {
  ajax({
    url: '/api/users',
    type: 'POST',
    data: userInfo
  })
  .done((userData) => {
    dispatch(getUserData(userData));
  });
};
