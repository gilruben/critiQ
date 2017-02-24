import { ajax } from 'jquery';
import { browserHistory } from 'react-router';

export const GET_USER_DATA = 'GET_USER_DATA';
export const EDIT_USER_DATA = 'EDIT_USER_DATA';
export const LOGOUT = 'LOGOUT';

const getUserData = payload => ({
  type: GET_USER_DATA,
  data: payload
});

const logout = () => ({
  type: LOGOUT
});

export const getUserDataAsync = () => (dispatch) => {
  ajax({
    url: '/api/users/individual',
    type: 'GET'
  })
  .done((userData) => {
    dispatch(getUserData(userData));
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

const editUserData = payload => ({
  type: EDIT_USER_DATA,
  data: payload
});

export const editUserDataAsync = (data) => (dispatch) => {
  ajax({
    url: '/api/users/individual',
    type: 'PUT',
    data
  })
  .done((userData) => {
    dispatch(editUserData(userData));
  });
};

export const logInAsync = loginInfo => () => {
  ajax({
    url: '/auth/login/',
    type: 'POST',
    data: loginInfo
  })
  .done(() => {
    browserHistory.push('/');
  });
};

export const logoutAsync = () => (dispatch) => {
  ajax({
    url: '/auth/logout',
    type: 'POST'
  })
  .done(() => {
    dispatch(logout());
    browserHistory.push('/signin');
  });
};

