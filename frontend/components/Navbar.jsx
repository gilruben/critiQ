import React from 'react';

const Navbar = React.createClass({
  render() {
    return (
      <div>
        <nav>
          <div className="brand">critiQ</div>
          <ul>
            <li>Browse</li>
            <li>Account</li>
          </ul>
        </nav>
        {this.props.children}
      </div>
    );
  },
});

export default Navbar;
