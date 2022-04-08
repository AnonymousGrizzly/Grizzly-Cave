import React from 'react';
import Button from '../Button';

const PacketActionMenu = ({ removePacket, transferPacket, message }) => {
  return (
    <React.Fragment>
      <h3>
        <h3>Packet Details</h3>
      </h3>
      {message}
      <div className="modal-btns">
        <Button text="Remove" className={'error-btn'} onClick={removePacket} />
        <Button
          text="Transfer File"
          className={'secondary-btn'}
          onClick={transferPacket}
        />
      </div>
    </React.Fragment>
  );
};

export default PacketActionMenu;
