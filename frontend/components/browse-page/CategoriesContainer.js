import React from 'react';

const CategoryContainer = React.createClass({
  handleEssay(e) {
    const level = e.target.innerHTML.toLowerCase().split(' ').join('_');

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
                <div className="level-div" onClick={this.handleEssay}>Middle School</div>
                <div className="level-div" onClick={this.handleEssay}>High School</div>
                <div className="level-div" onClick={this.handleEssay}>College</div>
                <div className="level-div" onClick={this.handleEssay}>Other</div>
              </div>
          </li>
          {
            categories.map((ele, idx) => {
              return <li onClick={this.handleEssay} key={idx}>{ele}</li>;
            })
          }
        </ul>
      </div>
    );
  },
});

export default CategoryContainer;
