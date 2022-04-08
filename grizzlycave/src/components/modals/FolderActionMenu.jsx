import React from 'react';
import Button from '../Button';

const FolderActionMenu = ({ removeFolder, openFolder }) => {
  return (
    <React.Fragment>
      <h3>Folder Settings</h3>
      <div className="modal-btns">
        <Button text="Remove" className={'error-btn'} onClick={removeFolder} />
        <Button
          text="Open Folder"
          className={'secondary-btn'}
          onClick={openFolder}
        />
      </div>
    </React.Fragment>
  );
};

export default FolderActionMenu;
