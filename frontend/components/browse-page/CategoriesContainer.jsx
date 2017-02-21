import React from 'react';

const CategoryContainer = React.createClass({
  handleEssay(e) {
    const level = e.target.innerHTML.toLowerCase().split(' ').join('_');

    const category = 'essays';

    this.props.getDocuments(category, level);
  },
  handleCategory(e) {
    const category = e.target.innerHTML.toLowerCase().split(' ').join('_');
    this.props.getDocuments(category);
  },
  render() {
    const categories = ['Resumes', 'Cover letters', 'Upcoming Deadlines', 'Other writings'];
    return (
      <div className="categories">
        <ul>
          <li className="dropdown">
            <div className="dropbutton indiv-category">Essays</div>
            <div className="dropdown-content">
              <div className="level-div" onClick={this.handleEssay}>Middle School</div>
              <div className="level-div" onClick={this.handleEssay}>High School</div>
              <div className="level-div" onClick={this.handleEssay}>College</div>
              <div className="level-div" onClick={this.handleEssay}>Other</div>
            </div>
          </li>
          {
            categories.map((ele, idx) => {
              return <li className="indiv-category" onClick={this.handleCategory} key={idx}>{ele}</li>;
            })
          }
        </ul>
      </div>
    );
  }
});

export default CategoryContainer;
