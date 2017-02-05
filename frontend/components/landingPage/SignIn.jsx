import React from 'react';

const SignIn = React.createClass({
  render() {
    return (
      <div className="sign-in">
        <h1>Sign in</h1>
        <form>
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
          <input type="submit" />
        </form>
      </div>
    );
  },
});

export default SignIn;
