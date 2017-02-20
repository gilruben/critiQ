import React from 'react';

const AddComment = React.createClass({
  getInitialState() {
    return { showCommentBox: false };
  },
  componentWillReceiveProps(props) {
    const { isTextHighlighted } = props;

    // Resets the showCommentBox field if no text was higlighted.
    // Useful for when user has the comment box open but then clicks on an area
    // on the editor without highlighting. Without the code below, the user
    // would see the comment box again after highlighting text. What we want to
    // happen when text is highlighted is for the add comment button to show up
    // first. After the add comment button is clicked, then the comment box should
    // be shown.
    if (!isTextHighlighted) {
      this.setState({ showCommentBox: false });
    }
  },
  toggleCommentBox() {
    let { showCommentBox } = this.state;
    showCommentBox = showCommentBox || true;

    this.setState({ showCommentBox });
  },
  render() {
    const { isTextHighlighted } = this.props;
    const { showCommentBox } = this.state;

    return (
      <div>
        {
          isTextHighlighted && !showCommentBox ?
            <button id="add-comment-button" onClick={this.toggleCommentBox}>
              +
            </button> : null
        }

        {
          showCommentBox && isTextHighlighted ?
            <div>
              <textarea className="comment-box" />

              <div>
                <button>Comment</button>
                <button>Cancel</button>
              </div>
            </div> : null
        }
      </div>
    );
  }
});

export default AddComment;
