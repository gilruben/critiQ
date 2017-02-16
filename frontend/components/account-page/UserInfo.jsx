import React from 'react';
import '../../styles/account-page.css';

const UserInfo = (props) => {
  // ternaries created to reuse component for account page and profile page views
  return (
    <div>
      <div className="account-user-info">
        <h3>Username: {props.account.username}</h3>
        {props.owner ? <h3>Email: {props.account.email}</h3> : false}
        <h3>Level: {props.account.level}</h3>
        <h3>Rating: {props.account.rating}</h3>
        <h3>Biography: {props.account.bio}</h3>
        {props.owner
          ? <button className="account-edit-button"
              onClick={props.allowEdit}>
                Edit
            </button>
          : false
        }
      </div>
    </div>
  );
};

export default UserInfo;
