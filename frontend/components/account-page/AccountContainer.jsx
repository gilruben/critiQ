import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserDataAsync, editUserDataAsync } from '../../actions/user-actions';
import { editDocumentStatusAsync } from '../../actions/document-actions';

import AccountProfile from './AccountProfile';
import IndividualWork from '../browse-page/IndividualWork';

const AccountContainer = React.createClass({
  componentDidMount() {
    this.props.getUserData(3);
  },
  makeActive(doc) {
    const id = doc.id;
    const newStatus = { active: true };
    this.props.editDocumentStatus(newStatus, id);
  },
  makeInactive(doc) {
    const id = doc.id;
    const newStatus = { active: false };
    this.props.editDocumentStatus(newStatus, id);
  },
  render() {
    const activeList = [];
    const inactiveList = [];
    this.props.user.documents.forEach(docs=> {
      docs.active ? activeList.push(docs) : inactiveList.push(docs);
    });
    return (
      <div>
        <div className="account-main-div">
          <AccountProfile account={this.props.user} editUserData={this.props.editUserData} />
        </div>
        <div className="user-documents-list-div">
          <div className="active-doc">
            {
              activeList.map((docs, idx) => {
                return (
                  <div className={docs.id} key={idx}>
                    <button key={idx} onClick={this.makeInactive.bind(this, docs)}>Make Inactive</button>
                    <IndividualWork document={docs} />
                  </div>
                );
              })
            }
          </div>
          <div className="inactive-doc">
            {
              inactiveList.map((docs, idx) => {
                return (
                  <div className={docs.id} key={idx}>
                    <button key={idx} onClick={this.makeActive.bind(this, docs)}>Make Active </button>
                    <IndividualWork document={docs} />
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUserData: getUserDataAsync,
    editUserData: editUserDataAsync,
    editDocumentStatus: editDocumentStatusAsync
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
