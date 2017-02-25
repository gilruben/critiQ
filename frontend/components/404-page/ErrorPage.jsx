import React from 'react';
import '../../styles/404-page.css';

const ErrorPage = () => {
  return (
    <div className="error">
      <img id="img" src="http://i.imgur.com/bkVx6UG.png" />
      <div className="error-text">
        <div className={'error-title'}>
          <div>404 Page</div>
        </div>
        <div className={'error-msg'}>You seem lost. Hoo are you looking for?</div>
      </div>
    </div>
  );
};

export default ErrorPage;
