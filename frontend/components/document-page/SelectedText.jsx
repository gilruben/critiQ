import React from 'react';

// This component is used to highlight the selected text targeted for commenting
const SelectedText = (props) => {
  const style = {
    backgroundColor: '#ffa593',
    padding: '2px 0',
    border: '#ffa593 solid 1px',
    borderRadius: '3px'
  };
  const { contentState, entityKey } = props;
  const entity = contentState.getEntity(entityKey);
  // console.log(entity.getData());
  return <span style={style}>{props.children}</span>;
};

export default SelectedText;
