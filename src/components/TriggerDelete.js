import React from 'react';

const Trigger = ({ triggerText, buttonRef, showModal }) => {
  return (
    <button
      className="btn btn-lg btn-danger center modal-button"
      ref={buttonRef}
      onClick={showModal}
      style={{margin:"auto"}}
    > 
      {triggerText}
    </button>
  );
};
export default Trigger;
