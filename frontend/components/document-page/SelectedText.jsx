import React from 'react';

const SelectedText = (props) => {
  const style = {
    backgroundColor: '#ffa593',
    padding: '2px 0',
    border: '#ffa593 solid 1px',
    borderRadius: '3px',
  };

  return <span style={style}>{props.children}</span>;
};

module.exports = SelectedText;
