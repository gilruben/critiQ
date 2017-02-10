import React from 'react';
import { ajax } from 'jquery';

const MyAccount = React.createClass({
  getInitialState() {
    return { account: {}, documents: {} };
  },
  componentDidMount() {
    ajax({
      url: 'api/users/1',
      type: 'GET',
    }).then((accounts) => {
      this.setState({ account: accounts });
    }).then(() => {
      ajax({
        url: 'api/documents/1',
        type: 'GET',
      }).then((docs) => {
        this.setState({ documents: docs });
      });
    });
  },
  render() {
    console.log(this.state.documents.body);
    return (
      <div>
        <div>
          <h2>Username: {this.state.account.username}</h2>
          <h2>email: {this.state.account.email}</h2>
          <h2>bio: {this.state.account.bio}</h2>
          <h2>current level: {this.state.account.level}</h2>
        </div>
        <div>
          <h1>WORKS</h1>
            <div>
              <h2>{this.state.documents.deadline}</h2>
              <h2>{this.state.documents.title}</h2>
              <h2>{this.state.documents.body}</h2>
            </div>
        </div>
      </div>
    );
  },
});

export default MyAccount;
