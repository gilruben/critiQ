import React from 'react';

const CommentContainer = (props) => {
  const { comment, resolver } = props;
  const reviewer = comment.User;
  const { id } = comment;

  return (
    <div className="comment-box">
      <div className="user-resolve-div">
        <p>{reviewer.username}</p>
        <button onClick={resolver.bind(null, id)}>resolve</button>
      </div>
      <div className="comment-text">{comment.comment}</div>
    </div>
  );
};

export default CommentContainer;
