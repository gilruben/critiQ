import React from 'react';
import { ajax } from 'jquery';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import '../../styles/create.css';

const CreatePage = React.createClass({
  getInitialState() {
    return { title: '', body: false, category: 'paper', privacy: 'public', deadline: new Date().toJSON().slice(0, 10), userId: 1, active: true, editorState: EditorState.createEmpty() };
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
  onClick() {
    const savedContent = this.state.editorState.getCurrentContent();
    const documentBody = convertToRaw(savedContent);
    this.setState({ body: documentBody });

    if (this.state.body) {
      this.postDocument();
    }
  },
  postDocument() {
    ajax({
      url: '/api/documents/',
      type: 'POST',
      data: {
        title: this.state.title,
        body: this.state.body,
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
    const inlineStyles = [
    { name: 'Bold', style: 'BOLD' },
    { name: 'Italic', style: 'ITALIC' },
    { name: 'Underline', style: 'UNDERLINE' },
    ];
    return (
      <div>
        <h1>Uploads</h1>
        <div>
          <form>
            <h3>Title:</h3>
            <input type="text" placeholder="Enter a title" onChange={this.addUploadState.bind(this, 'title')} />
            <h3>Privacy Setting:</h3>
            <select onChange={this.addUploadState.bind(this, 'privacy')}>
              <option value="public">public</option>
              <option value="semi-private">semi-private</option>
              <option value="private">private</option>
            </select>
            <h3>Category</h3>
            <select onChange={this.addUploadState.bind(this, 'category')}>
              <option value="essay">essay</option>
              <option value="cover letter">cover letter</option>
              <option value="resume">resume</option>
              <option value="other">other</option>
            </select>
            <h3>Deadline:</h3>
            <input name="date" type="date" onChange={this.addUploadState.bind(this, 'deadline')} />
          </form>
          {inlineStyles.map((val, idx) => {
            return (
              <button
                key={idx} 
                onClick={this.onInlineStyleClick.bind(this, val.style)}>
                { val.name }
              </button>
            )})}
          <div className="editor">
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
            />
          </div>
        </div>
        <button onClick={this.onClick}>Upload</button>
      </div>
    );
  },
});

export default CreatePage;
