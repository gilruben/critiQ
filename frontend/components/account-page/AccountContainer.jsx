// dependancies
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
// css
import '../../styles/account-page.css';
// actions
import { getUserDataAsync, editUserDataAsync } from '../../actions/user-actions';
import { editDocumentStatusAsync } from '../../actions/document-actions';
// components
import AccountProfile from './AccountProfile';
import IndividualWork from '../browse-page/IndividualWork';

const AccountContainer = React.createClass({
  componentDidMount() {
    this.props.getUserData(3);
  },
  docActiveSwitch(doc) {
    const id = doc.id;
    const newStatus = doc.active ? { active: false } : { active: true };
    this.props.editDocumentStatus(newStatus, id);
  },
  handleClick() {
    this.props.router.push('/create');
  },
  render() {
    // Separate active and inactive documents to map over active/inactive divs
    const activeList = [];
    const inactiveList = [];
    this.props.user.documents.forEach(docs=> {
      docs.active ? activeList.push(docs) : inactiveList.push(docs);
    });
    return (
      <div className="account-page-div">
        <div className="account-section">
          <button id="create-btn" onClick={this.handleClick}>
            Create Document
          </button>
          <div className="account-main-div">
            <AccountProfile
              account={this.props.user}
              editUserData={this.props.editUserData}
            />
          </div>
        </div>
        <div className="user-documents-list">
          { (activeList.length > 0)
            ? <h1>Active Work</h1>
            : false
          }
          <div className="active-doc">
            {
              activeList.map((doc, idx) => {
                return (
                  <div className={doc.active} key={idx}>
                    <button key={doc.id} onClick={this.docActiveSwitch.bind(this, doc)}>Make Inactive</button>
                    <IndividualWork document={doc} username={this.props.user.username}/>
                  </div>
                );
              })
            }
          </div>
          { (inactiveList.length > 0) ? <h1>Inactive Work</h1> : false }
          { (activeList.length <= 2)
            ? <div className="inactive-doc">
              {
               inactiveList.map((doc, idx) => {
                 return (
                   <div className={doc.active} key={idx}>
                     <button key={doc.id} onClick={this.docActiveSwitch.bind(this, doc)}>Make Active </button>
                     <IndividualWork document={doc} username={this.props.user.username} />
                   </div>
                 );
               })
              }
            </div>
           : <div className="inactive-doc">
             <h3>(Two Active Document Limit)</h3>
             {
             inactiveList.map((doc, idx) => {
               return (
                 <div className={doc.active} key={idx}>
                   <IndividualWork document={doc} username={this.props.user.username} />
                 </div>
               );
             })
            }
           </div>
           }
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
