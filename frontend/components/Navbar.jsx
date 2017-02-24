import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserDataAsync, logoutAsync } from '../actions/user-actions';


const Navbar = React.createClass({
  componentDidMount() {
    this.props.getUserData();
  },
  handleClick(link) {
    this.props.router.push(link);
  },
  handleLogout() {
    this.props.logout();
  },
  render() {
    return (
      <div>
        <nav>
          <div className="brand" onClick={this.handleClick.bind(this, '/')}>Critiq</div>
          <ul>
            <li onClick={this.handleClick.bind(this, '/browse')}>Browse</li>
            <li onClick={this.handleClick.bind(this, '/')}>Account</li>
            <li onClick={this.handleLogout}>Logout</li>
          </ul>
        </nav>
        {this.props.children}
      </div>
    );
  }
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getUserData: getUserDataAsync,
    logout: logoutAsync
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(withRouter(Navbar));
