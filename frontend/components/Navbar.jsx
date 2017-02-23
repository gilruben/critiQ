import React from 'react';
import { withRouter } from 'react-router';

const Navbar = React.createClass({
  handleClick(e) {
    const link = e.target.innerHTML;

    this.props.router.push(`/${link}`);
  },
  render() {
    return (
      <div>
        <nav>
          <div className="brand">Critiq</div>
          <ul>
            <li onClick={this.handleClick}>Browse</li>
            <li onClick={this.handleClick}>Account</li>
          </ul>
        </nav>
        {this.props.children}
      </div>
    );
  }
});

export default withRouter(Navbar);
