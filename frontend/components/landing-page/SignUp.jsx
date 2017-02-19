import React from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createUserDataAsync } from '../../actions/user-actions';

const SignUpContainer = React.createClass({
  getInitialState() {
    return {
      username: '',
      password: '',
      email: '',
      level: '',
      showModal: false
    };
  },
  handleSubmit() {
    this.props.createUser({
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      level: this.state.level
    });
  },
  handleSignupModal() {
    this.setState({ showModal: true });
  },
  handleCloseModal() {
    this.setState({ showModal: false });
  },
  handleChange(change, e) {
    this.setState({
      [change]: e.target.value
    });
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
            <div className="second-sign-up-div">
              <i className="fa fa-window-close" onClick={this.handleCloseModal} />
              <h1 className="sign-up-header">Hello! Let{"'"}s get to know you.</h1>
              <form>
                <input className="sign-up-input" value={this.state.username} onChange={this.handleChange.bind(this, 'username') } type="text" placeholder="Pick a username" />
                <input className="sign-up-input" value={this.state.email} onChange={this.handleChange.bind(this, 'email') } type="email" placeholder="Your email" />
                <input className="sign-up-input" value={this.state.password} onChange={this.handleChange.bind(this, 'password') } type="password" placeholder="A password" />
                <div className="student">
                  <p className="student-question" >Are you a student?</p>
                  <select>
                    <option selected="true" disabled >choose one</option>
                    <option value="middle_school">middle school</option>
                    <option value="high_school">high school</option>
                    <option value="college">college</option>
                    <option value="other">other</option>
                  </select>
                </div>
                <input className="sign-up-button" onSubmit={this.handleSubmit} value="create" type="submit" />
              </form>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
});

// const mapStateToProps = (state) => {
//   return { user: state.user };
// };

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ createUser: createUserDataAsync });
};

export default connect(mapDispatchToProps)(SignUpContainer);
