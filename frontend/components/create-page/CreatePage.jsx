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
    // Document model requires underscore for categories.
    // Add underscore for any categories with spaces. (Example: cover letter = cover_letter)
    let value = event.target.value;

    if (inputName !== 'title') {
      value = value.split(' ').join('_');
    }

    this.setState({ [inputName]: value });
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
      { value: 'other writing' }
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
      { name: 'UL', style: 'unordered-list-item', fontName: 'fa fa-list-ul' },
      { name: 'OL', style: 'ordered-list-item', fontName: 'fa fa-list-ol' }
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
            <div className="innerForm-container">
              <i className="cancel-button fa fa-window-close" onClick={this.handleCloseModal} />
              <form>
                <h1>Awesome! We just need a bit more information...</h1>
                <input className="title-input-box" type="text" placeholder="Enter a title" onChange={this.addUploadState.bind(this, 'title')} />
                <div className="privacy-container">
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
                </div>
                <div className="category-container"><h3>Category</h3>
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
                </div>
                <div className="deadline-container">
                  <h3>Deadline</h3>
                  <input className="deadline-input-box" name="date" type="date" onChange={this.addUploadState.bind(this, 'deadline')} />
                </div>
              </form>
              <button className="upload-button" onClick={this.onClick}>Upload</button>
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
                if (val.style === 'ordered-list-item' || val.style === 'unordered-list-item') {
                  return (
                    <i
                      key={val.name}
                      className={`${val.fontName} indiv-blocktype-button-list`}
                      onClick={this.onBlockTypeClick.bind(this, val.style)}
                    />
                  );
                }

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
          <div className="draft-container">
            <div className="editor">
              <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default CreatePage;
