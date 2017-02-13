import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const ProfileContainer = React.createClass({
  componentDidMount() {
  },
  render() {
    return (
      <div>Hello World!</div>
    );
  },
});

const mapState = state => (
  { profile: state.profile }
);

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUser: getProfileData }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
