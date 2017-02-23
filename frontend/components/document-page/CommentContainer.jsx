import React from 'react';

const CommentContainer = (props) => {
  const { comment, resolver } = props;
  const reviewer = comment.User;
  const { id } = comment;

  return (
    <div>
      <div>
        {reviewer.username}
        <button onClick={resolver.bind(null, id)}>resolve</button>
      </div>
      <div>{comment.comment}</div>
    </div>
  );
};

export default CommentContainer;
