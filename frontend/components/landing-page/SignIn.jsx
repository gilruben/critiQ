import React from 'react';
import SignUpContainer from './SignUpContainer';

const SignIn = React.createClass({
  getInitialState() {
    return { email: '', password: '' };
  },
  render() {
    return (
      <div className="sign-in">
        <h1>Welcome. <span className="please-login">Please login.</span></h1>
        <form>
          <input className="sign-in-input" type="email" placeholder="Email" />
          <input className="sign-in-input" type="password" placeholder="Password" />
          <div className="sign-in-bottom">
            <div className="sign-up-div">
              <p>Don{"'"}t have an account?</p>
              <SignUpContainer />
            </div>
            <input className="sign-in-button" type="submit" />
          </div>
        </form>
      </div>
    );
  }
});

export default SignIn;
