import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Editor, EditorState, RichUtils, Modifier, CompositeDecorator,
  SelectionState, convertToRaw, convertFromRaw } from 'draft-js';
import { getDocumentAsync } from '../../actions/document-actions';
import SelectedText from './SelectedText';
import '../../styles/text-editor.css';
import '../../styles/document-page.css';

const DocumentContainer = React.createClass({
  getInitialState() {
    const decorator = this.getDecorator();
    const document = this.props.document;

    // Body of document in state
    const { title, body } = document;

    // Create editorState with document body in state, if it exist, else
    // create empty editorState
    const editorState = body ? EditorState.createWithContent(convertFromRaw(body), decorator) :
      EditorState.createEmpty(decorator);

    return { title, editorState };
  },
  componentDidMount() {
    const id = this.props.params.id;

    // dispatches a thunk which performs an ajax call to get the proper document
    this.props.getDocument(id);
  },
  componentWillReceiveProps(props) {
    const document = props.document
    if (document.body) {
      const decorator = this.getDecorator();
      const { title, body } = document;
      const contentState = convertFromRaw(body);
      const editorState = EditorState.createWithContent(contentState, decorator);

      this.setState({ title, editorState });
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
  getSelectionState() {
    const state = this.state;
    const { editorState } = state;
    const contentState = editorState.getCurrentContent();
    const rawState = convertToRaw(contentState);
    const selectionState = editorState.getSelection();

    // For testing pursposes
    console.log('RAW:', rawState);
    console.log('NON-RAW: ', convertFromRaw(rawState));
    console.log(editorState.getSelection());
    console.log('SELECTION STATE:', selectionState);
    console.log('BLOCK KEY:', selectionState.getAnchorKey());
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
  commentTest() {
    const anchorKey = '329t8';
    const anchorOffset = 379;
    const focusKey = '329t8';
    const focusOffset = 410;
    const isBackward = false;
    const hasFocus = true;
    const editorState = this.state.editorState;
    const contentState = editorState.getCurrentContent();
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

    console.log(CommentSelectionState.getFocusKey());

    // New contentstate with comment entity attached
    const contentStateWithComment = Modifier.applyEntity(
      contentState,
      CommentSelectionState,
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
  render() {
    const state = this.state;
    const { title } = state;

    return (
      <div id="document-page">
        <div id="editor-content">
          <h1>{title}</h1>

          <div className="editor-buttons">
            {/* <button onClick={this.getSelectionState}>Log Selection State</button> */}
            <button onClick={this.createCommentEntity}>Comment</button>
            <button onClick={this.resolveComment}>Resolve</button>
            <button onClick={this.commentTest}>Comment Test</button>
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
  return bindActionCreators({ getDocument: getDocumentAsync }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentContainer);
