import React from 'react';

const AccountBio = React.createClass({
  getInitialState() {
    return { account: this.props.account, edit: false };
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
    this.setState({ account: this.props.account, edit: true });
  },
  finishEdit(event) {
    event.preventDefault();

    const accountState = this.state.account;
    const id = this.props.account.id;

    this.props.editUserData(accountState, id);
    this.setState({ edit: false });
  },
  render() {
    if (this.state.edit === false) {
      return (
        <div>
          <h1>Account Info</h1>
          <button onClick={this.allowEdit}>Edit</button>
          <h3>Username: {this.state.account.username}</h3>
          <h3>Email: {this.state.account.email}</h3>
          <h3>Level: {this.state.account.level}</h3>
          <h3>Rating: {this.state.account.rating}</h3>
          <h3>Biography: {this.state.account.bio}</h3>
        </div>);
    }
    return (
      <form onSubmit={this.finishEdit}>
        <h1>Account Info</h1>
        <input type="submit" value="Submit Changes"/>
        <h3>Username: <input value={this.state.account.username} onChange={this.handleChange.bind(this, 'username')} /></h3>
        <h3>Email: <input value={this.state.account.email} onChange={this.handleChange.bind(this, 'email')} /></h3>
        <h3>Level: <select onChange={this.handleChange.bind(this, 'level')}>
          <option value={this.state.account.level}>{this.state.account.level}</option>
          <option value={'jr-high'}>Jr-High</option>
          <option value={'high-school'}>High-School</option>
          <option value={'college'}>College</option>
          <option value={'professional'}>Professional</option>
          <option value={'other'}>Other</option>
        </select>
        </h3>
        <h3>Rating: {this.state.account.rating}</h3>
        <h3>Biography: <textarea rows="6" cols="80" value={this.state.account.bio} onChange={this.handleChange.bind(this, 'bio')} /> </h3>
      </form>
    );
  },
});

export default AccountBio;

