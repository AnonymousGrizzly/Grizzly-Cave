import React, { useEffect, useRef, useState, useContext } from 'react';
import Button from '../components/Button';
import '../styles/Storage.css';
import { FileService } from '../services/file';
import {
  Upload,
  FolderPlus,
  Mail,
  Tool,
  ArrowRightCircle,
} from 'react-feather';
import { useHistory } from 'react-router';
import TableRow from '../components/TableRow';
import { FolderService } from '../services/folder';
import { formatDate } from '../helpers/formatDate';
import { formatBytes } from '../helpers/formatSize';
import { validateFolderName } from '../RegEx/validateFolderName';
import ModalContext, { ModalType } from '../contexts/ModalContext';
import Dropzone, {useDropzone} from 'react-dropzone';

function Storage() {
  const { closeModal, type, openModal } = useContext(ModalContext);

  const history = useHistory();
  const fileInput = useRef();
  const folderInput = useRef();
  const [progress, setProgress] = useState(0);
  const [uploadStart, setUploadStart] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [showFolderInput, setShowFolderInput] = useState(false);
  const [data, setData] = useState({
    files: [],
    folders: [],
  });

  useEffect(() => {
    FolderService.getData(currentFolderId).then((data) => {
      setData(data);
    });
  }, [currentFolderId]);

  const onClick = () => {
    fileInput.current.click();
  };

  const fileSend = () => {
    history.push('/mail');
  };

  const handleFolderSubmit = async (currentFolder, folderName) => {
    if (validateFolderName(folderName)) {
      const folder = await FolderService.createFolder(
        currentFolder,
        folderName
      );
      setData({
        files: data.files,
        folders: [...data.folders, folder],
      });
    }
  };
  
  const onFiles = async () => {
    const file = fileInput.current.files[0];

    if (!file) return;
    setUploadStart(true);
    const uploadedFile = await FileService.uploadFile(
      {
        file,
        parentFolderId: currentFolderId,
      },
      (pr) => {
        if (pr > 99) {
          setTimeout(() => {
            setUploadStart(false);
          }, 3000);
          setUploadDone(true);
        }

        if (pr > 0) {
          setProgress(pr);
        }
      }
    );

    setData({
      folders: data.folders,
      files: [...data.files, uploadedFile],
    });

    fileInput.current.value = null;
  };

  

  const deleteFolder = async (folderId) => {
    const { success } = await FolderService.deleteFolder(folderId);

    if (success) {
      return setData({
        folders: data.folders.filter((f) => f.folder_id !== folderId),
        files: data.files,
      });
    }
  };

  const deleteFile = async (fileId) => {
    const { success } = await FileService.deleteFile(fileId);
    if (success) {
      return setData({
        folders: data.folders,
        files: data.files.filter((f) => f.file_id !== fileId),
      });
    }
    // if not | show message
  };

  const openFile = async (id, filename) => {
    const url = await FileService.downloadFile(id);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    a.click();
  };
  const openFolder = (folderId) => {
    setCurrentFolderId(folderId);
  };

  const changeShowInput = () => {
    setShowFolderInput(!showFolderInput);
  };

  const openFolderMenu = (folder) => {
    openModal(ModalType.FOLDER_ACTION_MENU, {
      openFolder: () => {
        openFolder(folder.folder_id);
        closeModal();
      },
      removeFolder: async () => {
        await deleteFolder(folder.folder_id);
        closeModal();
      },
    });
  };

  const openFileMenu = (file) => {
    openModal(ModalType.FILE_ACTION_MENU, {
      downloadFile: () => {
        openFile(file.file_id, file.filename);
        closeModal();
      },
      removeFile: async () => {
        await deleteFile(file.file_id);
        closeModal();
      },
    });
  };
  const { getInputProps, getRootProps } = useDropzone({ onFiles })

  return (
    <div id="storage">
      {uploadStart && (
        <div className="progressbar">
          {uploadDone ? 'Done! ' : progress.toFixed(1) + ' %'}{' '}
        </div>
      )}
      
      <div className="storage-cntnr">
        <div className="storagetitle-cntnr">
          <h1>File Storage</h1>
        </div>
        <div className="content-cntnr">
          <div className="files-cntnr">
            <table className="files-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Last modified</th>
                  <th>File size</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                
                {data.folders.map((folder, i) => {

                  return (
                    <TableRow
                    Name={folder.foldername}
                    onClick={() => openFolder(folder.folder_id)}
                    lastModified={formatDate(folder.modified_at)}
                    fileSize={'-'}
                    folder={true}
                    showMore={() => openFolderMenu(folder)}
                    key={i}
                    index = {i}
                    parent = {folder.parentfolder_id}
                    />
                    );
                  })}
                  {data.files.map((file, i) => {
                    return (
                      <TableRow
                        Name={file.filename}
                        onClick={openFile}
                        lastModified={formatDate(file.modified_at)}
                        fileSize={formatBytes(file.filesize)}
                        folder={false}
                        key={i}
                        id={file.file_id}
                        showMore={() => openFileMenu(file)}
                      />
                    );
                  })}
              </tbody>
            </table>
            {data.files.length == 0 && data.folders.length == 0 &&
              <p className='centered-p'>- Storage is empty - </p>
            }
          </div>
          <div className="control-panel">
            <h3 className="icon">
              <Tool size="22" />
              &nbsp;Control Panel{' '}
            </h3>
            <br />
            <Button
              className={'third-btn'}
              onClick={onClick}
              text={'Upload File'}
            />
            <Upload size="18" />
            <br />
            <Button
              className={'third-btn'}
              text={'Create Folder'}
              onClick={changeShowInput}
            />
            <FolderPlus size={'18'} />
            {showFolderInput && (
              <div>
                <input className="folderInput" ref={folderInput} />
                <Button
                  text={<ArrowRightCircle size={'18'} />}
                  className={'mini-btn'}
                  onClick={() =>
                    handleFolderSubmit(
                      currentFolderId,
                      folderInput.current.value
                    )
                  }
                />
              </div>
            )}
            <br />
            <Button
              className={'third-btn'}
              text={'Send File'}
              onClick={fileSend}
            />
            <Mail size={'18'} />
            <br />
          </div>
        </div>
      </div>
      <input
        type="file"
        ref={fileInput}
        onChange={onFiles}
        style={{
          display: 'none',
        }}
      />
    </div>
  );
}

export default Storage;
