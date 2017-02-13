import React from 'react';
import { ajax } from 'jquery';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import '../../styles/create.css';

const CreatePage = React.createClass({
  getInitialState() {
    // The date variable holds the current date in the format required for the document model.
    const date = new Date().toJSON().slice(0, 10);
    return { title: '', category: 'essay', privacy: 'public', deadline: date, userId: 1, active: true, editorState: EditorState.createEmpty() };
  },
  onChange(editorState) {
    return this.setState({ editorState });
  },
  onInlineStyleClick(style) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        style,
      ));
  },
  onBlockTypeClick(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType,
      ));
  },
  onClick() {
    const savedContent = this.state.editorState.getCurrentContent();
    const documentBody = convertToRaw(savedContent);
    ajax({
      url: '/api/documents/',
      type: 'POST',
      data: {
        title: this.state.title,
        body: documentBody,
        category: this.state.category,
        privacy: this.state.privacy,
        deadline: this.state.deadline,
        UserId: this.state.userId,
        active: this.state.active,
      },
    });
  },
  addUploadState(inputName, event) {
    this.setState({ [inputName]: event.target.value });
  },
  render() {
    const privacyLevels = [
      { value: 'public' },
      { value: 'semi-private' },
      { value: 'private' },
    ];
    const categories = [
      { value: 'essay' },
      { value: 'cover letter' },
      { value: 'resume' },
      { value: 'other' },
    ];
    const inlineStyles = [
      { name: 'Bold', style: 'BOLD' },
      { name: 'Italic', style: 'ITALIC' },
      { name: 'Underline', style: 'UNDERLINE' },
    ];
    const blockTypes = [
      { name: 'H1', style: 'header-one' },
      { name: 'H2', style: 'header-two' },
      { name: 'H3', style: 'header-three' },
      { name: 'H4', style: 'header-four' },
      { name: 'H5', style: 'header-five' },
      { name: 'H6', style: 'header-six' },
      { name: 'UL', style: 'unordered-list-item' },
      { name: 'OL', style: 'ordered-list-item' },
    ];
    return (
      <div className="page-container">
        <div className="form-container">
          <h1>Uploads</h1>
          <form>
            <h3>Title:</h3>
            <input type="text" placeholder="Enter a title" onChange={this.addUploadState.bind(this, 'title')} />
            <h3>Privacy Setting:</h3>
            <select onChange={this.addUploadState.bind(this, 'privacy')}>
              {privacyLevels.map((val, idx) => {
                return (
                  <option
                    key={idx}
                    value={val.value}>
                    {val.value}
                  </option>
                );
              },
            )}
            </select>
            <h3>Category</h3>
            <select onChange={this.addUploadState.bind(this, 'category')}>
              {categories.map((val, idx) => {
                return (
                  <option
                    key={idx}
                    value={val.value}>
                    {val.value}
                  </option>
                );
              },
            )}
            </select>
            <h3>Deadline:</h3>
            <input name="date" type="date" onChange={this.addUploadState.bind(this, 'deadline')} />
          </form>
        </div>
        <div className='editor-container'>
          <div className='instyleButtons-container'>
            {inlineStyles.map((val, idx) => {
              return (
                <button
                  key={idx}
                  className="instyleButton" 
                  onClick={this.onInlineStyleClick.bind(this, val.style)}>
                  { val.name }
                </button>
              );
            },
          )}
            {blockTypes.map((val, idx) => {
              return (
                <button
                  key={idx} 
                  className="instyleButton" 
                  onClick={this.onBlockTypeClick.bind(this, val.style)}>
                  { val.name }
                </button>
              );
            },
          )}
          </div>
          <div className="editor">
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
            />
          </div>
          <div className="uploadButton-container">
            <button className="upload-button" onClick={this.onClick}>Upload</button>
          </div>
        </div>
      </div>
    );
  },
});

export default CreatePage;
