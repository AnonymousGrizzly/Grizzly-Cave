import React from 'react';
import Button from '../Button';

const FileActionMenu = ({ removeFile, downloadFile }) => {
  return (
    <React.Fragment>
      <h3>File Settings</h3>
      <div className="modal-btns">
        <Button text="Remove" className={'error-btn'} onClick={removeFile} />
        <Button
          text="Download File"
          className={'secondary-btn'}
          onClick={downloadFile}
        />
      </div>
    </React.Fragment>
  );
};

export default FileActionMenu;
