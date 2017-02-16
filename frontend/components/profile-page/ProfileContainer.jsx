import React from 'react';
import { ajax } from 'jquery';

const ProfileContainer = React.createClass({
  componentDidMount() {
    const id = this.props.params.id;
    ajax({
      url: `/api/users/${id}`,
      type: 'GET'
    })
    .done((userData) => {
      this.setState(userData);
    });
  },
  render() {
    return (
      <div>Hello World!</div>
    );
  }
});

export default ProfileContainer;
