import React from 'react';

const Reviewer = props => {
  const usernameClass = props.username === props.selectedReviewer ? 'selected-reviewer' : 'reviewer';
  return <div className={usernameClass}>{props.username}</div>;
};

export default Reviewer;
