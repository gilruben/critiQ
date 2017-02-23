import React from 'react';

// This component is used to highlight the selected text targeted for commenting
const SelectedText = (props) => {
  const { contentState, entityKey } = props;
  const entity = contentState.getEntity(entityKey);
  const { commentId, selectedComment, selectComment } = entity.getData();
  const commentData = { commentId };

  const style = {
    backgroundColor: selectedComment === commentId ? '#ff7b60' : '#ffa593',
    padding: '2px 0',
    border: '#ffa593 solid 1px',
    borderRadius: '3px'
  };

  return (
    <span style={style} onClick={selectComment.bind(null, commentData)}>
      {props.children}
    </span>
  );
};

export default SelectedText;
