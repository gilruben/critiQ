import { ajax } from 'jquery';

export const GET_USER_DATA = 'GET_USER_DATA';
export const EDIT_USER_DATA = 'EDIT_USER_DATA';

const getUserData = payload => ({
  type: GET_USER_DATA,
  data: payload,
});

export const getUserDataAsync = id => (dispatch) => {
  ajax({
    url: `/api/users/${id}`,
    type: 'GET',
  })
  .done((userData) => {
    dispatch(getUserData(userData));
  });
};

const editUserData = payload => ({
  type: EDIT_USER_DATA,
  data: payload,
});

export const editUserDataAsync = (data, id) => (dispatch) => {
  ajax({
    url: `/api/users/${id}`,
    type: 'PUT',
    data,
  })
  .done((userData) => {
    dispatch(editUserData(userData));
  });
};
