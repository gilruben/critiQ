import React from 'react';

const CommentContainer = (props) => {
  const { comment, resolver } = props;
  const reviewer = comment.User;
  const { anchorKey, anchorOffset, focusKey, focusOffset, isBackward, hasFocus, id } = comment;
  const commentData = { anchorKey, anchorOffset, focusKey, focusOffset, isBackward, hasFocus };

  return (
    <div>
      <div>
        {reviewer.username}
        <button onClick={resolver.bind(null, commentData, id)}>resolve</button>
      </div>
      <div>{comment.comment}</div>
    </div>
  );
};

export default CommentContainer;
