import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import Input from './Input';
import "../designs/Modal.css"
import {Lock, Mail, X, User} from 'react-feather';

const Modal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" >
      <div className="modal">
        <div className="modal-header">
          <Button
                className={"icon-btn"}
                text={<X size={"22"}/>}
                onClick={hide}
              />
        </div>
        <h3>
          Edit Folder:
        </h3>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;