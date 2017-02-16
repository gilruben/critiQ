import React from 'react';
import CommentContainer from './CommentContainer';

const CommentListContainer = React.createClass({
  render() {
    const comments = this.props.comments;

    return (
      <ul className="comment-list-ul">
        {
          comments.map(comment => (
            <li key={comment.id}><CommentContainer comment={comment} /></li>
          ))
        }
      </ul>
    );
  }
});

export default CommentListContainer;
