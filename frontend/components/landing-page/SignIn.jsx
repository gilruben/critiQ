import React from 'react';

const SignIn = React.createClass({
  getInitialState() {
    return { email: '', password: '' };
  },
  render() {
    return (
      <div className="sign-in">
        <h1>Sign in</h1>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="submit" />
        </form>
        <p>Don{"'"}t have account? <span>Sign up</span></p>
      </div>
    );
  },
});

export default SignIn;
