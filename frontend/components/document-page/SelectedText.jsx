import React from 'react';

// This component is used to highlight the selected text targeted for commenting
const SelectedText = (props) => {
  const style = {
    backgroundColor: '#ffa593',
    padding: '2px 0',
    border: '#ffa593 solid 1px',
    borderRadius: '3px'
  };

  return <span style={style}>{props.children}</span>;
};

export default SelectedText;
