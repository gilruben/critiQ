import React from 'react';

const Navbar = React.createClass({
  render() {
    return (
      <nav>
        <div className="brand">critiQ</div>
        <ul>
          <li>Browse</li>
          <li>Account</li>
        </ul>
      </nav>
    );
  },
});

export default Navbar;
