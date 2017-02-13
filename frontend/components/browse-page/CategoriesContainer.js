import React from 'react';

const CategoryContainer = React.createClass({
  handleEssay(e) {
    const level = e.target.innerHTML.toLowerCase();
    const category = 'essays';

    this.props.getDocuments(category, level);
  },
  render() {
    const categories = ['Resume', 'Cover letters', 'Upcoming Deadlines', 'Other writings'];
    return (
      <div className="categories">
        <ul>
          <li className="dropdown">
            <div className="dropbutton">Essays</div>
              <div className="dropdown-content">
                <div onClick={this.handleEssay}>Middle School</div>
                <div onClick={this.handleEssay}>High School</div>
                <div onClick={this.handleEssay}>College</div>
                <div onClick={this.handleEssay}>Other</div>
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

export default CategoryContainer;
