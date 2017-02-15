import React from 'react';

const AccountDocuments = React.createClass({
  getInitialState() {
    return { docs: null };
  },
  componentWillReceiveProps(props) {
    this.setState({ docs: props.account.documents });
  },
  render() {
    return (
      <div className="individual-work">
        <ul>
          {this.state.docs.map((a, idx) => {
            return (
              <li key={idx}>
                <h4>category: <input value={a.category} />
                  <br />
                  privacy: {a.privacy}
                </h4>
                <h2>Title: {a.title}</h2>
                <h3>{a.body.foo}</h3>
              </li>
            );
          })}
        </ul>
        <br />
      </div>
    );
  },
});

export default AccountDocuments;


