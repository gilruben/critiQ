// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Editor, EditorState, RichUtils, Modifier, CompositeDecorator,
  SelectionState, convertToRaw, convertFromRaw } from 'draft-js';
// Actions
import { getDocumentAsync, deleteCommentAsync, selectReviewer }
  from '../../actions/document-actions';
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

    return { editorState, isTextHighlighted: false };
  },
  componentDidMount() {
    const id = this.props.params.id;

    // dispatches a thunk which performs an ajax call to get the proper document
    this.props.getDocument(id);
  },
  componentWillReceiveProps(props) {
    const { document } = props;
    const { title, body, comments, selectedReviewer } = document;

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
      } else if (comments.length) {
        this.applyEntities(document, editorState, title);
      } else {
        this.setState({ title, editorState });
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
  createCommentEntity() {
    const editorState = this.state.editorState;
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('COMMENT', 'MUTABLE');
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    console.log('ANCHOR_KEY:', selectionState.getAnchorKey());
    console.log('ANCHOR_OFFSET:', selectionState.getAnchorOffset());
    console.log('FOCUS_KEY:', selectionState.getFocusKey());
    console.log('FOCUS_OFFSET:', selectionState.getFocusOffset());
    console.log('IS_BACKWARD:', selectionState.getIsBackward());
    console.log('HAS_FOCUS', selectionState.getHasFocus());

    // New contentstate with comment entity attached
    const contentStateWithComment = Modifier.applyEntity(
      contentState,
      selectionState,
      entityKey,
    );

    // New editorstate with comment entity attached
    const newEditorState = EditorState.push(
      editorState,
      contentStateWithComment,
      'apply-entity',
    );

    this.setState({ editorState: newEditorState });
  },
  resolveComment() {
    const editorState = this.state.editorState;
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const entityKey = null;

    // Removes a specific comment entity from the contentstate
    const newContentState = Modifier.applyEntity(
      contentState,
      selectionState,
      entityKey
    );

    // New editorstate with the entity removed
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'apply-entity'
    );

    this.setState({ editorState: newEditorState });
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
  applyEntities(documentData, editorState) {
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
        const contentStateWithEntity = contentState.createEntity('COMMENT', 'MUTABLE');
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
  handleChange(editorState) {
    const selectionState = editorState.getSelection();
    const anchorOffset = selectionState.getAnchorOffset();
    const focusOffset = selectionState.getFocusOffset();
    const difference = focusOffset - anchorOffset;

    // Passes true or false value to the local state depending on whether or
    // not the difference between anchorOffset and focusOffset is equal to 0.
    // A difference of 0 means no text was highlighted. Any other number means
    // text was highlighted.
    this.setState({ editorState, isTextHighlighted: difference !== 0 });
  },
  resolve(id) {
    // let editorState = this.state.editorState;
    // const contentState = editorState.getCurrentContent();
    // const selectionState = new SelectionState(commentData);
    // const entityKey = null;
    //
    // // Removes a specific comment entity from the contentstate
    // const newContentState = Modifier.applyEntity(
    //   contentState,
    //   selectionState,
    //   entityKey,
    // );
    //
    // // New editorstate with the entity removed
    // editorState = EditorState.push(
    //   editorState,
    //   newContentState,
    //   'apply-entity',
    // );
    this.props.deleteComment(id);
    // this.setState({ editorState });
  },
  render() {
    const { title, comments, selectedReviewer } = this.props.document;
    const { isTextHighlighted } = this.state;

    return (
      <div id="document-page">
        <div className="reviewer-list-div">
          <ReviewerListContainer
            reviewers={this.getListOfReviewers(comments)}
            selectReviewer={this.props.selectReviewer}
          />
        </div>

        <div id="editor-content">
          <h1>{title}</h1>

          <div className="editor-buttons">
            <button onClick={this.createCommentEntity}>Comment</button>
            <button onClick={this.resolveComment}>Resolve</button>
          </div>

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
          />

          <div>
            <AddComment isTextHighlighted={isTextHighlighted} />
          </div>
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
      selectReviewer
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentContainer);
