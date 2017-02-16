import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Editor, EditorState, RichUtils, Modifier, CompositeDecorator,
  SelectionState, convertToRaw, convertFromRaw } from 'draft-js';
import { getDocumentAsync, selectReviewer } from '../../actions/document-actions';
import SelectedText from './SelectedText';
import ReviewerListContainer from './ReviewerListContainer';
import '../../styles/text-editor.css';
import '../../styles/document-page.css';

const DocumentContainer = React.createClass({
  getInitialState() {
    const decorator = this.getDecorator();
    const document = this.props.document;

    // Body of document in state
    const { body } = document;

    // Create editorState with document body in state, if it exist, else
    // create empty editorState
    const editorState = body ? EditorState.createWithContent(convertFromRaw(body), decorator) :
      EditorState.createEmpty(decorator);

    return { editorState };
  },
  componentDidMount() {
    const id = this.props.params.id;

    // dispatches a thunk which performs an ajax call to get the proper document
    this.props.getDocument(id);
  },
  componentWillReceiveProps(props) {
    const document = props.document;

    if (document.body) {
      const decorator = this.getDecorator();
      const { title, body, comments } = document;
      const contentState = convertFromRaw(body);
      const editorState = EditorState.createWithContent(contentState, decorator);

      if (comments.length) this.applyEntities(document, editorState, title);
      else this.setState({ title, editorState });
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
  handleChange(editorState) {
    this.setState({ editorState });
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
      entityKey,
    );

    // New editorstate with the entity removed
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'apply-entity',
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

    entityData.forEach((data) => {
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

    return reviewers;
  },
  render() {
    const { title, comments } = this.props.document;

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
      selectReviewer
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentContainer);
