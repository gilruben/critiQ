// dependancies
import React from 'react';
import { ajax } from 'jquery';
// css
import '../../styles/account-page.css';
// components
import UserInfo from '../account-page/UserInfo';
import ActiveDocs from './ActiveDocs';

const ProfileContainer = React.createClass({
  getInitialState() {
    return ({ account: null });
  },
  componentDidMount() {
    ajax({
      url: '/api/users/individual',
      type: 'GET'
    })
    .done((userData) => {
      this.setState({ account: userData });
    });
  },
  render() {
    if (this.state.account) {
      return (
        <div>
          <UserInfo account={this.state.account} />
          <ActiveDocs
            username={this.state.account.username}
            activeList={this.state.account.Documents}
          />
        </div>
      );
    }
    return (
      <div>
        Loading...
      </div>
    );
  }
});

export default ProfileContainer;
