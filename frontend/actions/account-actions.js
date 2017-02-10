import { ajax } from 'jquery';

export const GET_USER_ACCOUNT = 'GET_USER_ACCOUNT';
export const EDIT_USER_ACCOUNT = 'EDIT_USER_ACCOUNT';
export const DELETE_USER_ACCOUNT = 'DELETE_USER_ACCOUNT';

const getUserAccount = payload => ({
  type: GET_USER_ACCOUNT,
  data: payload,
});

const editUserAccount = payload => ({
  type: EDIT_USER_ACCOUNT,
  data: payload,
});

const deleteUserAccount = payload => ({
  type: DELETE_USER_ACCOUNT,
  data: payload,
});

export const getUserAccountAsync = () => (dispatch) => {
  ajax({
    url: '/api/users/:id',
    type: 'GET',
  })
  .done((userData) => {
    dispatch(getUserAccount(userData));
  });
};

export const editUserAccountAsync = () => (dispatch) => {
  ajax({
    url: '/api/users/:id',
    type: 'PUT',
  })
  .done((userData) => {
    dispatch(editUserAccount(userData));
  });
};

export const deleteUserAccountAsync = () => (dispatch) => {
  ajax({
    url: '/api/users/:id',
    type: 'DELETE',
  })
  .done((userData) => {
    dispatch(deleteUserAccount(userData));
  });
};
