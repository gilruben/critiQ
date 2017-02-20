import React from 'react';
import UserInfo from './UserInfo';

const AccountProfile = React.createClass({
  getInitialState() {
    return { account: this.props.account, edit: false, owner: true };
  },
  componentWillReceiveProps(props) {
    this.setState({ account: props.account });
  },
  handleChange(name, event) {
    const value = event.target.value;

    this.setState({
      account: Object.assign({}, this.state.account, { [name]: value })
    });
  },
  allowEdit() {
    this.setState({ edit: true });
  },
  submitEdit(event) {
    event.preventDefault();

    const accountState = this.state.account;
    const id = this.props.account.id;

    this.props.editUserData(accountState, id);
    this.setState({ edit: false });
  },
  render() {
    if (this.state.edit === false) {
      return (
        <UserInfo
          allowEdit={this.allowEdit}
          account={this.props.account}
          owner={this.state.owner}
        />
      );
    }
    return (
      <div className="account-user-info">
        <form className="profile-form-div" onSubmit={this.submitEdit}>
          <h3>
            <i className="fa fa-user" />
            <input className="edit-profile-input" value={this.state.account.username}
              onChange={this.handleChange.bind(this, 'username')}
            />
          </h3>
          <h3>
            <i className="fa fa-envelope-o" />
            <input className="edit-profile-input" value={this.state.account.email}
              onChange={this.handleChange.bind(this, 'email')}
            />
          </h3>
          <h3>Level:
            <select onChange={this.handleChange.bind(this, 'level')}>
              <option value={this.state.account.level}>{this.state.account.level}</option>
              <option value={'middle_school'}>middle school</option>
              <option value={'high_school'}>high school</option>
              <option value={'college'}>college</option>
              <option value={'other'}>other</option>
            </select>
          </h3>
          <h3>Rating: {this.state.account.rating}</h3>
          <h3>Bio:
          <textarea className="edit-profile-input" rows="3" cols="30"
            value={this.state.account.bio}
            onChange={this.handleChange.bind(this, 'bio')}
          />
          </h3>
          <input className="account-edit-button" type="submit" value="Submit Changes" />
        </form>
      </div>
    );
  }
});

export default AccountProfile;

