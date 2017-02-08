import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCategoryAsync } from '../../actions/category-actions';

const CategoryContainer = React.createClass({
  componentDidMount() {
    this.props.getCategory();
  },
  render() {
    const categories = ['essays', 'resume', 'cover letters', 'upcoming deadlines', 'other writing'];
    return (
      <div className="categories">
        <ul>
          {categories.map((ele, idx) => {
            return <li key={idx}>{ele}</li>;
          })}
        </ul>
      </div>
    );
  },
});

const mapStateToProps = (state) => {
  return { category: state.category };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getCategory: getCategoryAsync }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer);
