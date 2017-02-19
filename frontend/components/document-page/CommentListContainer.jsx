import React from 'react';
import CommentContainer from './CommentContainer';

const CommentListContainer = React.createClass({
  render() {
    const { comments, selectedReviewer, resolver } = this.props;

    return (
      <ul className="comment-list-ul">
        {
          comments.reduce((filtrdComments, comment) => {
            const user = comment.User;
            const username = user ? user.username : '';

            // filters out all the comments that belong to the selected reviewer
            if (username === selectedReviewer) {
              return ([
                ...filtrdComments,
                (<li key={comment.id}>
                  <CommentContainer comment={comment} resolver={resolver} />
                </li>)
              ]);
            }

            return filtrdComments;
          }, [])
        }
      </ul>
    );
  }
});

export default CommentListContainer;
