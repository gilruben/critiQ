import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDocumentsAsync } from '../../actions/browse-actions';

// import { ajax } from 'jquery';
import Categories from './Categories';
import IndividualWork from './IndividualWork';

const BrowseContainer = React.createClass({
  // getInitialState() {
  //   return {
  //     documentsList: [],
  //   };
  // },
  // componentDidMount() {
  //   ajax({
  //     url: '/api/documents',
  //     type: 'GET',
  //   })
  //   .done((response) => {
  //     this.setState({ documentsList: response });
  //   });
  // },
  componentDidMount() {
    this.props.getDocuments();
  },
  render() {
    return (
      <div>
        {console.log(this.state)}
        <Categories />
        <div className="documents-list-div">
          {
            this.state.documentsList.map((ele, idx) => {
              return (
                <div key={idx}>
                  <IndividualWork documents={ele} />
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
  return { browse: state.browse };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getDocuments: getDocumentsAsync }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseContainer);
