import React from 'react';

const SignIn = React.createClass({
  getInitialState() {
    return { email: '', password: '' };
  },
  render() {
    return (
      <div className="sign-in">
        <h1>Welcome. <span className="please-login">Please login.</span></h1>
        <form>
          <input className="sign-up-input" type="email" placeholder="Email" />
          <input className="sign-up-input" type="password" placeholder="Password" />
          <div className="sign-in-bottom">
            <p>Don{"'"}t have account? <span>Sign up</span></p>
            <input className="sign-in-button" type="submit" />
          </div>
        </form>
      </div>
    );
  },
});

export default SignIn;
