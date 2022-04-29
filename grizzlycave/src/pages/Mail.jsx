import React, { useState } from 'react';
import '../styles/Mail.css';
import '../styles/Storage.css';
import Input from '../components/Input';
import Button from '../components/Button';
import { useRef } from 'react';
import { FileService } from '../services/file';
import { PacketService } from '../services/packet';
import { useEffect } from 'react';
import { UserService } from '../services/user';
import { useContext } from 'react';
import ModalContext, { ModalType } from '../contexts/ModalContext';
import Letter from '../components/Letter';
import {
  Tool
} from 'react-feather';


function Mail() {
  const [username, setUsername] = useState('');
  const [shortMessage, setShortMessage] = useState('');
  const [file, setFile] = useState(null);
  const [recieverId, setRecieverId] = useState(null);

  const [statusMessage, setStatusMessage] = useState('');
  const [isValidUser, setIsValidUser] = useState(false);
  const [packets, setPackets] = useState([]);

  const fileInput = useRef();
  const { openModal, closeModal } = useContext(ModalContext);

  useEffect(() => {
    // Gather all the packets

    PacketService.fetchAll().then(({ packets }) => {
      setPackets(packets);
    });
  }, []);

  useEffect(() => {
    if (username === '') return;
    const delayDebounceFn = setTimeout(() => {
      UserService.checkUsername(username).then(({ success, data }) => {
        setIsValidUser(success);
        setStatusMessage(success ? '' : 'User does not exist');
        setRecieverId(data.id);
      });
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [username]);

  const onSendClick = async () => {
    if (!username) {
      return setStatusMessage('User not selected');
    }

    if (!isValidUser) {
      return setStatusMessage('User does not exist.');
    }

    if (file === null) {
      return setStatusMessage('File not selected');
    }

    const uploadedFile = await FileService.uploadFile({
      file,
      parentFolderId: null,
    });

    const packet = await PacketService.createPacket({
      fileId: uploadedFile.file_id,
      username,
      shortMessage,
      recieverId,
    });

    // if (!packet.success) {
    setStatusMessage(packet.data.message);
    // }
  };

  const onChooseFileClick = () => {
    fileInput.current.click();
  };

  const deletePacket = async (packetId) => {
    const { data, success } = await PacketService.deletePacket(packetId);

    if (success) {
      setPackets(packets.filter((p) => p.packet_id !== packetId));
    }
  };

  const transferPacket = async (packetId) => {
    const { success } = await PacketService.transferPacket(packetId);

    if (success) {
      setPackets(packets.filter((p) => p.packet_id !== packetId));
    }
  };

  const onFiles = () => {
    const file = fileInput.current.files[0];

    setFile(file);
  };

  const openPacketMenu = (packet) => {
    openModal(ModalType.PACKET_ACTION_MENU, {
      message: packet.short_message,
      removePacket: async () => {
        await deletePacket(packet.packet_id);
        closeModal();
      },

      transferPacket: async () => {
        await transferPacket(packet.packet_id);
        closeModal();
      },
    });
  };

  return (
    <div>
      <div id="mail" className="mail-cntnr">
        <h1>File Send</h1>
        <div className='content-cntnr'> 
          <div className="mailbox-cntnr">
            <h3>Mailbox</h3>
            {packets.length == 0 &&
              <div>
                <p>- You have no mail -</p>
              </div>
            }
            {packets.map((packet) => (
              <Letter
                Name={packet.username}
                onClick={() => openPacketMenu(packet)}
                key={packet.packet_id}
              />
            ))}
            {}
          </div>
          <div className="postaloffice-cntnr">
            <h3 className="icon">New Packet</h3>
            <div>
              <p>to:</p>
              <Input
                required
                placeholder="Receiver username"
                type="text"
                value={username}
                setValue={setUsername}
              />
              <p>short message:</p>
              <Input
                placeholder={'message'}
                value={shortMessage}
                setValue={setShortMessage}
              />
              <p>choose file:</p>
              <div className="office-btns">
                <Button
                  text={'Choose file'}
                  onClick={onChooseFileClick}
                  className={'choose-btn'}
                />
                <input
                  type="file"
                  ref={fileInput}
                  onChange={onFiles}
                  style={{
                    display: 'none',
                  }}
                />
                <br />
                <Button
                  text={'SEND'}
                  onClick={onSendClick}
                  className={'secondary-btn'}
                />
              </div>
              <div className='control-panel'>

              </div>
            </div>
          </div>
        </div>
        
      </div>
      <h3 className='errorMsg'>{statusMessage}</h3>
    </div>
  );
}

export default Mail;
