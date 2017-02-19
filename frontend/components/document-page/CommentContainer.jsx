import React from 'react';

const CommentContainer = React.createClass({
  render() {
    return (
      <div>
        {this.props.comment.comment}
      </div>
    );
  }
});

export default CommentContainer;
