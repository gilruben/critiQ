import React from 'react';
import SignIn from './SignIn';

const LandingPage = React.createClass({
  render() {
    return (
      <div className="landing-page">
        <div className="title-div">
          <h1 className="landing-header">Critiq</h1>
          <h3 className="landing-motto">Make your first draft, your final</h3>
        </div>
        <SignIn />
      </div>
    );
  },
});

export default LandingPage;
