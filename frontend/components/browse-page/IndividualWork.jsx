import React from 'react';

const IndividualWork = React.createClass({
  render() {
    return (
      <div className="individual-work">
        <h2>{this.props.document.title}</h2>
        <h3>{this.props.document.User.username}</h3>
        <p>{this.props.document.deadline}</p>
        <p># of reviewers</p>
        {/* <p>snippet goes here: {console.log(this.props.document)}</p> */}
      </div>
    );
  },
});

export default IndividualWork;
