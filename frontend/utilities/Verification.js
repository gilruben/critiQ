import { ajax } from 'jquery';

// AJAX to check user login status on every page clicked.
// If user fails, redirect to signin page otherwise continue to selected page. 
const Verification = (nextstate, replace, cb) => {
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

export default Verification;
