import React from 'react';
import { Editor, EditorState, RichUtils, Modifier, convertToRaw, convertFromRaw } from 'draft-js';
import { Record } from 'immutable';
import '../styles/text-editor.css';

const TextEditor = React.createClass({
  getInitialState() {
    return { editorState: EditorState.createEmpty() };
  },
  getSelectionState() {
    const state = this.state;
    const { editorState } = state;
    const contentState = editorState.getCurrentContent();
    const rawState = convertToRaw(contentState);
    const selectionState = editorState.getSelection();

    console.log('RAW:', rawState);
    console.log('NON-RAW: ', convertFromRaw(rawState));
    console.log(editorState.getSelection());
    console.log('SELECTION STATE:', selectionState);
    console.log('BLOCK KEY:', selectionState.getAnchorKey());
  },
  boldClick() {
    this.handleChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  },
  handleChange(editorState) {
    console.log(editorState);
    this.setState({ editorState });
  },
  createCommentEntity() {
    const editorState = this.state.editorState;
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('COMMENT', 'MUTABLE');
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();


    const contentStateWithComment = Modifier.applyEntity(
      contentState,
      selectionState,
      entityKey,
    );

    const newEditorState = EditorState.push(
      editorState,
      contentStateWithComment,
      'apply-entity',
    );

    this.setState({ editorState: newEditorState });

    console.log(convertToRaw(newEditorState.getCurrentContent()));
  },
  logState() {
    const editorState = this.state.editorState;

    console.log(convertToRaw(editorState.getCurrentContent()));
  },
  render() {
    return (
      <div id="content">
        <h1>Draft.js Editor</h1>

        <div className="editor">
          <Editor editorState={this.state.editorState} onChange={this.handleChange} />
        </div>
        <button onClick={this.boldClick}>Bold</button>
        <button onClick={this.getSelectionState}>Log Selection State</button>
        <button onClick={this.createCommentEntity}>Comment</button>
        <button onClick={this.logState}>Log State</button>
      </div>
    );
  },
});

module.exports = TextEditor;
