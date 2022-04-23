import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import '../styles/Modal.css';
import { X } from 'react-feather';
import { useContext } from 'react';
import ModalContext, { ModalType } from '../contexts/ModalContext';
import FolderActionMenu from './modals/FolderActionMenu';
import FileActionMenu from './modals/FileActionMenu';
import PacketActionMenu from './modals/PacketActionMenu';

const MODALS = {
  [ModalType.FILE_ACTION_MENU]: FileActionMenu,
  [ModalType.FOLDER_ACTION_MENU]: FolderActionMenu,
  [ModalType.PACKET_ACTION_MENU]: PacketActionMenu,
};

const Modal = () => {
  const { data, type, closeModal } = useContext(ModalContext);

  if (type === null) {
    return null;
  }

  const Component = MODALS[type];

  return ReactDOM.createPortal(
    <React.Fragment>
      <div className="modal-overlay" />
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal-header">
            <Button
              className={'icon-btn'}
              text={<X size={'22'} />}
              onClick={closeModal}
            />
          </div>
          <Component {...data} />
        </div>
      </div>
    </React.Fragment>,
    document.getElementById('modal-root')
  );
};

export default Modal;
