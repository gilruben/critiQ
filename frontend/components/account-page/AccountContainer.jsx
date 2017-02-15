import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserDataAsync, editUserDataAsync } from '../../actions/user-actions';
import { editDocumentAsync } from '../../actions/browse-actions';

import AccountBio from './AccountBio';
import IndividualWork from '../browse-page/IndividualWork';

const AccountContainer = React.createClass({
  componentDidMount() {
    this.props.getUserData(1);
  },
  makeActive(doc) {
    const id = doc.id;
    const newStatus = { active: true };
    this.props.editDocument(newStatus, id);
  },
  makeInactive(doc) {
    const id = doc.id;
    const newStatus = { active: false };
    this.props.editDocument(newStatus, id);
    console.log(newStatus, id);
  },
  render() {
  // editUserData passed down as props to receive changes upon edit
  console.log(this.props.account.documents)
    return (
      <div>
        <div className="account-main-div">
          <AccountBio account={this.props.account} editUserData={this.props.editUserData} />
        </div>
        <div className="documents-list-div">
          {
            this.props.account.documents.map((docs, idx) => {
              if (docs.active) {
                return (
                  <div className="active-doc" key={idx}>
                    <button onClick={this.makeInactive.bind(this, docs)} className={docs.id}>Make Inactive</button>
                    <IndividualWork document={docs} />
                  </div>
                );
              } return (
                <div className="inactive-doc" key={idx}>
                  <button onClick={this.makeActive.bind(this, docs)} className={docs.id}>Make Active</button>
                  <IndividualWork document={docs} />
                </div>
              );
            })
          }
        </div>
      </div>
    );
  },
});

const mapStateToProps = (state) => {
  return { account: state.user };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUserData: getUserDataAsync,
    editUserData: editUserDataAsync,
    editDocument: editDocumentAsync
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
