import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDocumentsAsync } from '../../actions/browse-actions';
import Categories from './CategoriesContainer';
import IndividualWork from './IndividualWork';

const BrowseContainer = React.createClass({
  componentDidMount() {
    this.props.getDocuments();
  },
  render() {
    return (
      <div>
        <Categories getDocuments={this.props.getDocuments} />
        <div className="documents-list-div">
          {
            this.props.browse.documents.map((docs, idx) => {
              return (
                <div key={idx}>
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
  return { browse: state.browse };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getDocuments: getDocumentsAsync }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseContainer);
