import React from 'react';
import { withRouter } from 'react-router';
import readingTime from '../../utilities/ReadingTime';
import deadline from '../../utilities/Deadline';

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
          <p>{readingTime(this.props.document)}</p>
        </div>
        <div className="cat-user">
          <p className="individual-work-category">{this.props.document.category}</p>
          <span>•</span>
          <p className="individual-work-name">
            {
              // ternary for use in browse page (all users and all docs) and account page (one user with his docs)
              this.props.document.User ?
                this.props.document.User.username :
                this.props.username
            }
          </p>
        </div>
        <p className="snippet">{this.props.document.body.blocks[0].text}</p>
        <div className="dead-rev">
          <p className="deadline">ends {deadline(this.props.document.deadline)}</p>
          <p className="rev"># <i className="fa fa-user" /></p>
        </div>
      </div>
    );
  }
});

export default withRouter(IndividualWork);
