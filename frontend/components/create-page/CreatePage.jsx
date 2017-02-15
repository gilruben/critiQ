import React from 'react';
import { ajax } from 'jquery';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import ReactModal from 'react-modal';
import '../../styles/create.css';

const CreatePage = React.createClass({
  getInitialState() {
    // Today's date in the format required for the document model. (YYYY-MM-DD)
    const dateToday = new Date().toJSON().slice(0, 10);
    return { title: '', category: 'essay', privacy: 'public', deadline: dateToday, userId: 1, active: true, editorState: EditorState.createEmpty(), showModal: false };
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
        active: this.state.active
      }
    });
    this.props.router.push('/account');
  },
  addUploadState(inputName, event) {
    this.setState({ [inputName]: event.target.value });
  },
  handleOpenModal() {
    this.setState({ showModal: true });
  },
  handleCloseModal() {
    this.setState({ showModal: false });
  },
  render() {
    const privacyLevels = [
      { value: 'public' },
      { value: 'semi-private' },
      { value: 'private' }
    ];
    const categories = [
      { value: 'essay' },
      { value: 'cover letter' },
      { value: 'resume' },
      { value: 'other' }
    ];
    const inlineStyles = [
      { name: 'Bold', style: 'BOLD' },
      { name: 'Italic', style: 'ITALIC' },
      { name: 'Underline', style: 'UNDERLINE' }
    ];
    const blockTypes = [
      { name: 'H1', style: 'header-one' },
      { name: 'H2', style: 'header-two' },
      { name: 'H3', style: 'header-three' },
      { name: 'H4', style: 'header-four' },
      { name: 'H5', style: 'header-five' },
      { name: 'H6', style: 'header-six' },
      { name: 'UL', style: 'unordered-list-item' },
      { name: 'OL', style: 'ordered-list-item' }
    ];
    return (
      <div className="page-container">
        <div className="upload-container">
          <button onClick={this.handleOpenModal}>Upload</button>
        </div>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          className="modal"
        >
          <div className="form-container">
            <form>
              <h3>Title</h3>
              <input className="inputBox" type="text" placeholder="Enter a title" onChange={this.addUploadState.bind(this, 'title')} />
              <h3>Privacy Setting</h3>
              <select className="selectButton" onChange={this.addUploadState.bind(this, 'privacy')}>
                {
                  privacyLevels.map((val) => {
                    return (
                      <option
                        key={val.value}
                        value={val.value}
                      >
                        {val.value}
                      </option>
                    );
                  })
                }
              </select>
              <h3>Category</h3>
              <select className="selectButton" onChange={this.addUploadState.bind(this, 'category')}>
                {
                  categories.map((val) => {
                    return (
                      <option
                        key={val.value}
                        value={val.value}
                      >
                        {val.value}
                      </option>
                    );
                  })
                }
              </select>
              <h3>Deadline</h3>
              <input className="inputBox" name="date" type="date" onChange={this.addUploadState.bind(this, 'deadline')} />
            </form>
            <div className="formButton-container">
              <button className="form-button" onClick={this.onClick}>Upload</button>
              <button className="form-button" onClick={this.handleCloseModal}>Cancel</button>
            </div>
          </div>
        </ReactModal>
        <div className="editor-container">
          <div className="instyleButtons-container">
            {
              inlineStyles.map((val) => {
                return (
                  <button
                    key={val.name}
                    id="instyleButton"
                    className={`indiv-instyle-button-${val.name}`}
                    onClick={this.onInlineStyleClick.bind(this, val.style)}
                  >
                    {val.name}
                  </button>
                );
              })
            }
            {
              blockTypes.map((val) => {
                return (
                  <button
                    key={val.name}
                    id="instyleButton"
                    className={`indiv-blocktype-button-${val.name}`}
                    onClick={this.onBlockTypeClick.bind(this, val.style)}
                  >
                    {val.name}
                  </button>
                );
              })
            }
          </div>
          <div className="editor">
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
});

export default CreatePage;
