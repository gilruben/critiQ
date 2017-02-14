import React from 'react';
import { withRouter } from 'react-router';

const IndividualWork = React.createClass({
  handleClick() {
    const id = this.props.document.id;

    this.props.router.push(`/document/${id}`);
  },
  render() {
    console.log(this.props)
    return (
      <div className="individual-work" onClick={this.handleClick}>
        <h2>{this.props.document.title}</h2>
        <h3>{this.props.document.User.username}</h3>
        <p>{this.props.document.deadline}</p>
        <p># of reviewers</p>
        {/* <p>snippet goes here: {console.log(this.props.document)}</p> */}
      </div>
    );
  },
});

export default withRouter(IndividualWork);
