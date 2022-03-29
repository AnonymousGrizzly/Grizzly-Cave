import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import Input from './Input';
import "../designs/Modal.css"
import {Lock, Mail, X, User} from 'react-feather';
import { FolderService } from '../services/folder';
import { FileService } from '../services/file';

const Modal = ({ isShowing, hide, remove, open, isFolder }) => isShowing ? ReactDOM.createPortal(
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
          {isFolder ? (<h3>Folder Settings</h3>):(<h3>File Settings</h3>)}
        </h3>
        {isFolder ? (
          <div className='modal-btns'>
          <Button 
            text="Remove"
            className={"error-btn"}
            onClick={remove}
          />
          <Button
            text="Open Folder"
            className={"secondary-btn"}
            onClick={open}
          />
        </div>
        ) : (
          <div className='modal-btns'>
            <Button 
            text="Remove"
            className={"error-btn"}
            onClick={remove}
          />
          <Button
            text="Download File"
            className={"secondary-btn"}
            onClick={open}
          />
          </div>
        )}
        
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;