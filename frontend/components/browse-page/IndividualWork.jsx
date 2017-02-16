import React from 'react';
import { withRouter } from 'react-router';

const IndividualWork = React.createClass({
  handleClick() {
    const id = this.props.document.id;

    this.props.router.push(`/document/${id}`);
  },
  render() {
    return (
      <div className="individual-work" onClick={this.handleClick}>
        <div className="individual-work-header-div">
          <h2>{this.props.document.title}</h2>
        </div>
        <div className="cat-user">
          <p className="individual-work-category">{this.props.document.category}</p>
          <span>•</span>
          <p className="individual-work-name">{this.props.document.User.username}</p>
        </div>
        <p className="snippet">{this.props.document.body.blocks[0].text}</p>
        <div className="dead-rev">
          <p className="deadline">deadline: {this.props.document.deadline}</p>
          <p className="rev"># of reviewers</p>
        </div>
      </div>
    );
  }
});

export default withRouter(IndividualWork);
