import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCategoryAsync } from '../../actions/category-actions';

const CategoryContainer = React.createClass({
  componentDidMount() {
    this.props.getCategory();
  },
  render() {
    const categories = ['resume', 'cover letters', 'upcoming deadlines', 'other writing'];
    return (
      <div className="categories">
        <ul>
          <li className="dropdown">
            <a href="javascript:void(0)" className="dropbutton">essays</a>
            <div className="dropdown-content">
              <a href="#">Jr. High</a>
              <a href="#">Highschool</a>
              <a href="#">College</a>
            </div>
          </li>
          {
            categories.map((ele, idx) => {
              return <li key={idx}>{ele}</li>;
            })
          }
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
