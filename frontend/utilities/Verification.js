import { ajax } from 'jquery';
import { dispatch } from '../store/store';
import { getUserDataAsync } from '../actions/user-actions';

// This function is meant to be used on the onEnter hook of the route containing
// the Navbar component. It will attempt to retrieve a user's data by
// dispatching the getUserDataAsync action. If the user is logged in, the data
// will be retrieved and the user will be allowed to access the requested route.
// If the user was not logged in, they will be redirected to the signin page.
export const verification = (nextstate, replace, cb) => {
  dispatch(getUserDataAsync(replace, cb));
};

// Redirects the user away from the signin page if they are logged in. If they
// are logged in then they will be taken to the account page.
export const redirectFromSignIn = (nextstate, replace, cb) => {
  ajax({
    url: '/auth/verify',
    type: 'GET'
  })
  .done(() => {
    replace('/');
    cb();
  })
  .fail(() => {
    cb();
  });
};
