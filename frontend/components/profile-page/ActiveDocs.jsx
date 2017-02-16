import React from 'react';
import IndividualWork from '../browse-page/IndividualWork';

const ActiveDocs = (props) => {
  return (
    <div className="user-documents-list">
      <div className="active-doc">
        {
          props.activeList.map((doc, idx) => {
            return (
              <div className={doc.active} key={idx}>
                <IndividualWork document={doc} username={props.username} />
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default ActiveDocs;
