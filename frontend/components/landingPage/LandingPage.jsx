import React from 'react';
import SignIn from './SignIn';

const LandingPage = React.createClass({
  getInitialState() {
    return { email: '', password: '' };
  },
  render() {
    return (
      <div className="landing-page">
        <div>
          <h1>critiQ</h1>
          <h3>Make your first draft, your final</h3>
        </div>
        <SignIn />
      </div>
    );
  },
});

export default LandingPage;
