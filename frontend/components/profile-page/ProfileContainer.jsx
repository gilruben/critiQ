import React from 'react';
import { ajax } from 'jquery';

const ProfilePage = React.createClass({
  componentDidMount() {
    ajax({
      url: `/api/`,
      type: 'GET',
      success: (() => {

      }),
    });
  },
  render() {
    return (
      <div>Hello World!</div>
    );
  },
});

export default ProfilePage;
