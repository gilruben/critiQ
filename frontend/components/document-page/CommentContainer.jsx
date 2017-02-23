import React from 'react';


const CommentContainer = (props) => {
  const { comment, resolver, selectedComment, selectComment } = props;
  const reviewer = comment.User;
  const { id } = comment;
  const commentClass = selectedComment === id ? 'user-resolve-div-selected' :
    'user-resolve-div';
  const commentData = { commentId: id };

  return (
    <div className="comment-div" onClick={selectComment.bind(null, commentData)}>
      <div className={commentClass}>
        <p>{reviewer.username}</p>
        <button onClick={resolver.bind(null, id)}>resolve</button>
      </div>
      <div className="comment-text">{comment.comment}</div>
    </div>
  );
};

export default CommentContainer;
