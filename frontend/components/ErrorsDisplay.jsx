import React from 'react';

const ErrorsDisplay = (props) => {
  const errorMsgs = props.errorMsgs || [];

  if (!errorMsgs.length) return null;

  return (
    <ul className="error-list">
      {errorMsgs.map((msg, indx) => <li key={indx} className="error-list-item">{msg}</li>)}
    </ul>
  );
};

export default ErrorsDisplay;
