import React from 'react';
import Reviewer from './Reviewer';

const ReviewerListContainer = React.createClass({
  render() {
    const reviewers = Object.keys(this.props.reviewers);

    return (
      <ul>
        {
          reviewers.map(reviewer => (
            <li key={reviewer}><Reviewer username={reviewer} /></li>
          ))
        }
      </ul>
    );
  }
});

export default ReviewerListContainer;
