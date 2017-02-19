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

export const createUserAsync = userInfo => (dispatch) => {
  console.log(userInfo);
  ajax({
    url: '/api/users',
    type: 'POST',
    data: userInfo
  })
  .done((userData) => {
    console.log(userData);
    dispatch(getUserData(userData));
  });
};
