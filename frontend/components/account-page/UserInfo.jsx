import React from 'react';
import '../../styles/account-page.css';

const UserInfo = (props) => {
  // ternaries created to reuse component for account page and profile page views
  return (
    <div className="account-section">
      <div className="account-user-info">
        <h3><i className="fa fa-user" />{props.account.username}</h3>
        {props.owner
          ?
            <h3>
              <i className="fa fa-envelope-o" />
              {props.account.email}
            </h3>
          : false
        }
        <h3>Education: {props.account.level}</h3>
        <div className="bio-div">
          <h3>Bio: {props.account.bio}</h3>
        </div>
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
