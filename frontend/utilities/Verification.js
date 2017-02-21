import { ajax } from 'jquery';

// AJAX to check user login status on every page clicked.
// If user fails, redirect to signin page otherwise continue to selected page.
// Because callback is declared in params, cb must be included in promises to end function call.
const verification = (nextstate, replace, cb) => {
  ajax({
    url: '/auth/verify',
    type: 'GET'
  })
  .done(() => {
    cb();
  })
  .fail(() => {
    replace('/signin');
    cb();
  });
};

export default verification;
