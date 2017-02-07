import React from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import '../../styles/create.css';

const CreatePage = React.createClass({
  getInitialState() {
    return { title: '', body: {}, category: 'paper', privacy: '', deadline: '', editorState: EditorState.createEmpty() };
  },
  onChange(editorState) {
    return this.setState({ editorState: editorState });
  },
  // onBoldClick() {
  //   this.onChange(
  //     RichUtils.toggleInlineStyle(
  //       this.state.editorState,
  //       'BOLD',
  //   ));
  // }, 
  // onItalicClick() {
  //   this.onChange(
  //     RichUtils.toggleInlineStyle(
  //       this.state.editorState,
  //       'ITALIC',
  //   ));
  // }, 
  // onUnderlineClick() {
  //   this.onChange(
  //     RichUtils.toggleInlineStyle(
  //       this.state.editorState,
  //       'UNDERLINE',
  //   ));
  // },
  onDecorationClick(input, decoration) {
    if(input === 'BOLD') {
      this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        'BOLD',
      ));
    } else if (input === 'ITALIC') {
      this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        'ITALIC',
      ));
    } else if (input === 'UNDERLINE') {
      this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        'UNDERLINE',
      ));
    }
  },
  onUploadClick() {
    const document = this.state.editorState.getCurrentContent();
    const rawData = convertToRaw(document);
    console.log(rawData);
  },
  render() {
    return (
      <div>
        <h1>Uploads</h1>
        <div>
          <form>
            <h3>Title:</h3>
            <input type="text" placeholder="Enter a title"></input>
            <h3>Privacy Setting:</h3>
            <select>
              <option value="public">public</option>
              <option value="semi-private">semi-private</option>
              <option value="private">private</option>
            </select>
            <h3>Category</h3>
            <select>
              <option value="paper">paper</option>
              <option value="cover letter">cover letter</option>
              <option value="resume">resume</option>
              <option value="other writings">other writings</option>
            </select>
            <h3>Deadline:</h3>
            <input name="date" type="date"></input> 
          </form>
          <button onClick={this.onDecorationClick.bind(this, 'BOLD') }>Bold</button>
          <button onClick={this.onDecorationClick.bind(this, 'ITALIC') }>Italic</button>
          <button onClick={this.onDecorationClick.bind(this, 'UNDERLINE') }>Underline</button>
          <div className="editor">
            <Editor editorState={this.state.editorState} onChange={this.onChange} />
          </div>
        </div>
        <button onClick={this.onUploadClick}>Upload</button>
      </div>
    );
  },
});

export default CreatePage;
