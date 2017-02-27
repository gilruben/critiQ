import React from 'react';


const CommentContainer = (props) => {
  const { comment, resolver, selectedComment, selectComment, loggedInUser, documentOwner } = props;
  const reviewer = comment.User;
  const { id } = comment;
  const commentClass = selectedComment === id ? 'user-resolve-div-selected' :
    'user-resolve-div';
  const commentData = { commentId: id };
  const showResolve = (loggedInUser === documentOwner || loggedInUser === reviewer.username) || false;
  console.log(showResolve)
  return (
    <div className="comment-div" onClick={selectComment.bind(null, commentData)}>
      <div className={commentClass}>
        <p>{reviewer.username}</p>
        {showResolve ? <button onClick={resolver.bind(null, id)}>resolve</button> : null}
      </div>
      <div className="comment-text">{comment.comment}</div>
    </div>
  );
};

export default CommentContainer;
