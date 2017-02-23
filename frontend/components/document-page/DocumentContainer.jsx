// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Editor, EditorState, RichUtils, Modifier, CompositeDecorator,
  SelectionState, convertToRaw, convertFromRaw } from 'draft-js';
// Actions
import { getDocumentAsync, deleteCommentAsync, selectReviewer, createCommentAsync,
  selectComment } from '../../actions/document-actions';
// Components
import SelectedText from './SelectedText';
import AddComment from './AddComment';
import ReviewerListContainer from './ReviewerListContainer';
import CommentListContainer from './CommentListContainer';
// CSS
import '../../styles/text-editor.css';
import '../../styles/document-page.css';


const DocumentContainer = React.createClass({
  getInitialState() {
    const decorator = this.getDecorator();

    const editorState = EditorState.createEmpty(decorator);

    return { editorState, isTextHighlighted: false, highlightedTextData: null, selectedComment: 0 };
  },
  componentDidMount() {
    const id = this.props.params.id;

    // dispatches a thunk which performs an ajax call to get the proper document
    this.props.getDocument(id);
  },
  componentWillReceiveProps(props) {
    const { document } = props;
    const { title, body, comments, selectedReviewer, selectedComment } = document;

    if (document.body) {
      const decorator = this.getDecorator();
      const contentState = convertFromRaw(body);
      const editorState = EditorState.createWithContent(contentState, decorator);
      const { selectReviewer } = this.props;

      // If there are comments and a reviewer has not been selected, use the
      // first comments owner as the default selected reviewer.
      // Else if comments exist, apply them to the text editor(this assumes a
      // reviewer has been selected)
      // Else set the state of the editor with not comments applied
      if (comments.length && !selectedReviewer) {
        selectReviewer(comments[0].User.username);
      } else if (comments.length || selectedComment) {
        this.applyEntities(document, editorState, selectedComment);
      } else {
        this.setState({ title, editorState, selectedComment });
      }
    }
  },
  getDecorator() {
    // Applies the SelectedText component to text that has been highlighted
    // and labeled as a COMMENT entity
    return new CompositeDecorator([
      {
        strategy: this.findCommentStrategy,
        component: SelectedText
      }
    ]);
  },
  findCommentStrategy(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();

      // If character is not part of an entity then ignore
      if (entityKey === null) {
        return false;
      }

      return contentState.getEntity(entityKey).getType() === 'COMMENT';
    }, callback);
  },
  focus() {
    return this.editor.focus();
  },
  handleReturn() {
    const { editorState } = this.state;
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const block = contentState.getBlockForKey(selectionState.getAnchorKey());

    // If block type is a regular unstyled block, add a newline when enter is
    // pressed
    if (block.type === 'unstyled') {
      // New contentState with newline added
      const newContentState = Modifier.insertText(
        contentState,
        selectionState,
        '\n',
      );

      // New editorState with newline added
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        'insert-characters',
      );

      this.handleChange(newEditorState);
      return true;
    }

    return false;
  },
  applyEntities(documentData, editorState, selectedComment) {
    const { selectComment } = this.props;
    let newEditorState = editorState;
    const entityData = documentData.comments;
    const { selectedReviewer } = documentData;
    const firstReviewer = entityData[0].User.username;
    const filterBy = selectedReviewer || firstReviewer;

    // Add all the comments, that belong to the selected user, to the new editor
    // state
    entityData.forEach((data) => {
      const username = data.User.username;

      if (username === filterBy) {
        const { anchorKey, anchorOffset, focusKey, focusOffset, isBackward, hasFocus } = data;
        const contentState = newEditorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('COMMENT', 'MUTABLE', {
          commentId: data.id,
          selectedComment,
          selectComment
        });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const CommentSelectionState = new SelectionState({
          anchorKey,
          anchorOffset,
          focusKey,
          focusOffset,
          isBackward,
          hasFocus
        });

        // New contentstate with comment entity attached
        const contentStateWithComment = Modifier.applyEntity(
          contentState,
          CommentSelectionState,
          entityKey
        );

        // New editorstate with comment entity attached
        newEditorState = EditorState.push(
          newEditorState,
          contentStateWithComment,
          'apply-entity',
        );
      }
    });

    const documentBody = documentData.body;
    const blocks = documentBody.blocks;
    const firstBlockKey = blocks[0].key;

    // Selection state for the start of the page
    const startSelectionState = new SelectionState({
      anchorKey: firstBlockKey,
      anchorOffset: 0,
      focusKey: firstBlockKey,
      focusOffset: 0,
      isBackward: false,
      hasFocus: true
    });

    // Forces the cursor to the begining of the page
    newEditorState = EditorState.forceSelection(newEditorState, startSelectionState);

    this.setState({ editorState: newEditorState });
  },
  getListOfReviewers(comments) {
    const reviewers = {};

    comments.forEach((comment) => {
      const username = comment.User.username;

      if (!reviewers[username]) {
        reviewers[username] = true;
      }
    });

    // Returns an object with all the reviewers
    return reviewers;
  },
  getSelectionData(selectionState) {
    const anchorKey = selectionState.getAnchorKey();
    const anchorOffset = selectionState.getAnchorOffset();
    const focusKey = selectionState.getFocusKey();
    const focusOffset = selectionState.getFocusOffset();
    const isBackward = selectionState.getIsBackward();
    const hasFocus = true;

    return { anchorKey, anchorOffset, focusKey, focusOffset, isBackward, hasFocus };
  },
  handleChange(editorState) {
    const selectionState = editorState.getSelection();
    const selectionData = this.getSelectionData(selectionState);
    const { focusOffset, anchorOffset } = selectionData;
    const difference = focusOffset - anchorOffset;
    const isDiffNonZero = difference !== 0;

    // Passes true or false value to the local state depending on whether or
    // not the difference between anchorOffset and focusOffset is equal to 0.
    // A difference of 0 means no text was highlighted. Any other number means
    // text was highlighted.
    this.setState({
      editorState,
      isTextHighlighted: isDiffNonZero,
      highlightedTextData: isDiffNonZero ? selectionData : null
    });
  },
  resolve(id) {
    this.props.deleteComment(id);
  },
  render() {
    const { title, comments, selectedReviewer, selectedComment } = this.props.document;
    const { isTextHighlighted, highlightedTextData } = this.state;
    const { createComment, selectComment } = this.props;
    const { id } = this.props.params;

    return (
      <div id="document-page">
        <div className="reviewer-list-div">
          <ReviewerListContainer
            reviewers={this.getListOfReviewers(comments)}
            selectReviewer={this.props.selectReviewer}
            selectedReviewer={selectedReviewer}
          />
        </div>

        <div id="editor-content">
          <h1>{title}</h1>

          <div className="editor-view" onClick={this.focus}>
            <Editor
              editorState={this.state.editorState}
              onChange={this.handleChange}
              ref={ref => this.editor = ref}
              handleReturn={this.handleReturn}
            />
          </div>
        </div>

        <div className="comment-list-div">
          <CommentListContainer
            comments={comments}
            selectedReviewer={selectedReviewer}
            resolver={this.resolve}
            selectedComment={selectedComment}
            selectComment={selectComment}
          />

          <AddComment
            isTextHighlighted={isTextHighlighted}
            highlightedTextData={highlightedTextData}
            createComment={createComment}
            documentId={id}
          />
        </div>
      </div>
    );
  }
});

const mapStateToProps = state => ({
  document: state.document
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getDocument: getDocumentAsync,
      deleteComment: deleteCommentAsync,
      createComment: createCommentAsync,
      selectReviewer,
      selectComment
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentContainer);
