import { ajax } from 'jquery';

export const GET_USER_DATA = 'GET_USER_DATA';

const getUserData = payload => ({
  type: GET_USER_DATA,
  data: payload
});

// export const getUserDataAsync = () => (dispatch) => {
//   ajax({
//     url: '/api/users/1',
//     type: 'GET'
//   })
//   .done((userData) => {
//     dispatch(getUserData(userData));
//   });
// };

export const getUserDataAsync = username => (dispatch) => {
  ajax({
    url: '/auth/login/',
    type: 'POST',
    data: username
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
