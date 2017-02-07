import React from 'react';

const IndividualWork = React.createClass({
  render() {
    console.log(this.props);
    return (
      <div className="individual-work">
        <h2>{this.props.work.title}</h2>
        <h3>username</h3>
        <p>{this.props.work.deadline}</p>
        <p># of reviewers</p>
        <p>snippet goes here: {this.props.work.body.foo}</p>
      </div>
    );
  },
});

export default IndividualWork;
