import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignUpContainer from './SignUpContainer';
import { logInAsync } from '../../actions/user-actions';

const SignIn = React.createClass({
  getInitialState() {
    return { email: '', password: '' };
  },
  handleChange(inputType, e) {
    this.setState({ [inputType]: e.target.value });
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.logIn(this.state);
  },
  render() {
    return (
      <div className="sign-in">
        <h1>Welcome. <span className="please-login">Please login.</span></h1>
        <form onSubmit={this.handleSubmit}>
          <input className="sign-in-input" type="email" placeholder="Email" onChange={this.handleChange.bind(this, 'email')}/>
          <input className="sign-in-input" type="password" placeholder="Password" onChange={this.handleChange.bind(this, 'password')}/>
          <div className="sign-in-bottom">
            <div className="sign-up-div">
              <p>Don{"'"}t have an account?</p>
              <SignUpContainer />
            </div>
            <input className="sign-in-button" type="submit" />
          </div>
        </form>
      </div>
    );
  }
});

const mapDispatchToProps = dispatch => (
   bindActionCreators({ logIn: logInAsync }, dispatch)
);

export default connect(null, mapDispatchToProps)(SignIn);
