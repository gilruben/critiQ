import React from 'react';
import SignIn from './SignIn';

const LandingPage = React.createClass({
  getInitialState() {
    return { email: '', password: '' };
  },
  render() {
    return (
      <div className="landing-page">
        <div>This is the landing page</div>
        <SignIn />
      </div>
    );
  },
});

export default LandingPage;
