import React from 'react';

const Categories = React.createClass({
  render() {
    const categories = ['essay', 'resume', 'cover letter', 'other writing']
    return (
      <div className="categories">
        <ul>
          {categories.map((ele, idx) => {
            return <li key={idx}>{ele}</li>
          })}
        </ul>
      </div>
    );
  },
});

export default Categories;
