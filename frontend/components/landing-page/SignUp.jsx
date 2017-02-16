import React from 'react';
import ReactModal from 'react-modal';

const SignUp = React.createClass({
  getInitialState() {
    return { showModal: false };
  },
  handleSignupModal() {
    this.setState({ showModal: true });
  },
  handleCloseModal() {
    this.setState({ showModal: false });
  },
  render() {
    return (
      <div className="main-sign-up-div">
        <p className="sign-up-link" onClick={this.handleSignupModal}>Sign up</p>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          className="sign-up-modal"
        >
          <div className="sign-up">
            <i className="fa fa-window-close" onClick={this.handleCloseModal} />
            <h1 className="sign-up-header">Hello! Let{"'"}s get to know you.</h1>
            <form>
              <input className="sign-up-input" type="text" placeholder="Pick a username" />
              <input className="sign-up-input" type="email" placeholder="Your email" />
              <input className="sign-up-input" type="password" placeholder="A password" />
              <div className="student">
                <p className="student-question" >Are you a student?</p>
                <input type="radio" name="student" id="yes" value="yes" />
                <label htmlFor="yes">Yes</label>
                <input type="radio" name="student" id="no" value="no" />
                <label htmlFor="no">No</label>
                <select>
                  <option value="middle">Middle school</option>
                  <option value="high">High school</option>
                  <option value="college">College</option>
                  <option value="grad">Grad school</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button className="sign-up-button" type="submit">Create</button>
            </form>
          </div>
        </ReactModal>
      </div>
    );
  }
});

export default SignUp;
