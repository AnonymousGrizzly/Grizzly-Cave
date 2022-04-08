import React from 'react';

export const ModalType = {
  FILE_ACTION_MENU: 'file_action_menu',
  FOLDER_ACTION_MENU: 'folder_action_menu',
  PACKET_ACTION_MENU: 'packet_action_menu',
};

const defaultState = {
  type: null,
  data: {},
  openModal: (type, data) => {},
  closeModal: () => {},
};

const ModalContext = React.createContext(defaultState);

export default ModalContext;
