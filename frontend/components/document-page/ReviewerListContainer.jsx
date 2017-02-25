import React from 'react';
import Reviewer from './Reviewer';

const ReviewerListContainer = React.createClass({
  handleClick(reviewer) {
    this.props.selectReviewer(reviewer);
  },
  render() {
    const reviewers = Object.keys(this.props.reviewers);
    const { selectedReviewer, loggedInUser } = this.props;
    let reviewerList = [];

    reviewerList = reviewers.reduce((list, reviewer) => {
      const listItem = (
        <li key={reviewer} onClick={this.handleClick.bind(this, reviewer)}>
          <Reviewer username={reviewer} selectedReviewer={selectedReviewer} />
        </li>
      );

      return reviewer !== loggedInUser ? [...list, listItem] : [listItem, ...list];
    }, []);

    return (
      <ul className="reviewer-list-ul">
        {reviewerList}
      </ul>
    );
  }
});

export default ReviewerListContainer;
