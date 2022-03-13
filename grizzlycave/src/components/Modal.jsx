import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import Input from './Input';

const Modal = ({ isShowing, hide, createFolder }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className='modal-overlay'>
      <div className='modal-cntnr'>
        <p>
          Folder name:
        </p>
        <Input
          placeholder={"New Folder"}

          required
        />
        <div className='modal-btns'>
          <Button
            className={"secondary-btn"}
            text={"Create"}
            onClick={createFolder}
          />
          <Button
            className={"primary-btn"}
            text={"Cancel"}
            onClick={hide}
          />
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;