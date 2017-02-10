import React from 'react';
import { Editor, EditorState, RichUtils, Modifier, CompositeDecorator, convertToRaw, convertFromRaw } from 'draft-js';
import { Record } from 'immutable';
import SelectedText from './SelectedText';
import '../../styles/text-editor.css';
import '../../styles/document-page.css';

const DocumentContainer = React.createClass({
  getInitialState() {
    // Applies the SelectedText component to text that has been highlighted
    // and labeled as a COMMENT entity
    const decorator = new CompositeDecorator([
      {
        strategy: this.findCommentStrategy,
        component: SelectedText,
      },
    ]);

    return { editorState: EditorState.createEmpty(decorator) };
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

    // New contentstate with comment entitiy attached
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
  logState() {
    const editorState = this.state.editorState;

    console.log(convertToRaw(editorState.getCurrentContent()));
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
  render() {
    return (
      <div id="document-page">
        <div id="editor-content">
          <h1>Title</h1>

          <div className="editor-buttons">
            {/* <button onClick={this.getSelectionState}>Log Selection State</button> */}
            <button onClick={this.createCommentEntity}>Comment</button>
            <button onClick={this.resolveComment}>Resolve</button>
            {/* <button onClick={this.logState}>Log State</button> */}
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
  },
});

module.exports = DocumentContainer;
