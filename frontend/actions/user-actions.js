import { ajax } from 'jquery';
import { browserHistory } from 'react-router';

export const GET_USER_DATA = 'GET_USER_DATA';
export const CREATE_DOCUMENT = 'CREATE_DOCUMENT';
export const EDIT_USER_DATA = 'EDIT_USER_DATA';
export const LOGOUT = 'LOGOUT';
export const SET_ERROR_MSGS = 'SET_ERROR_MSGS';

const getUserData = payload => ({
  type: GET_USER_DATA,
  data: payload
});

const createDocument = payload => ({
  type: CREATE_DOCUMENT,
  data: payload
});

const logout = () => ({
  type: LOGOUT
});

const setErrorMsgs = payload => ({
  type: SET_ERROR_MSGS,
  data: payload
});

// Get logged in user's data. Meant to be used by the the verification function on
// onEnter
export const getUserDataAsync = (replace, cb) => (dispatch) => {
  ajax({
    url: '/api/users/individual',
    type: 'GET'
  })
  .done((userData) => {
    dispatch(getUserData(userData));

    if (cb) cb();
  })
  .fail(() => {
    if (replace) {
      replace('/signin');
      if (cb) cb();
    } else {
      browserHistory.push('/signin');
    }
  });
};

export const createUserAsync = userInfo => (dispatch) => {
  ajax({
    url: '/api/users',
    type: 'POST',
    data: userInfo
  })
  .done(() => {
    browserHistory.push('/');
  })
  .fail((err) => {
    const errorMsgs = err.responseJSON.errorMessages;

    dispatch(setErrorMsgs({ errorMsgs }));
  });
};

const editUserData = payload => ({
  type: EDIT_USER_DATA,
  data: payload
});

export const editUserDataAsync = data => (dispatch) => {
  ajax({
    url: '/api/users/individual',
    type: 'PUT',
    data
  })
  .done((userData) => {
    dispatch(editUserData(userData));
  });
};

export const createDocumentAsync = documentData => (dispatch) => {
  ajax({
    url: '/api/documents/',
    type: 'POST',
    data: documentData
  })
  .done((document) => {
    dispatch(createDocument(document));
    browserHistory.push('/');
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
