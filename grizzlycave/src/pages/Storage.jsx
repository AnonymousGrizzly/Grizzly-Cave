import React, { useEffect, useRef, useState } from 'react';
import Button from '../components/Button';
import '../designs/Storage.css';
import { FileService } from '../services/file';
import {Upload, FolderPlus, Mail, Tool, ArrowRightCircle} from 'react-feather';
import { useHistory } from 'react-router';
import TableRow from '../components/TableRow';
import { FolderService } from '../services/folder';


function Storage() {
  const history = useHistory();
  const fileInput = useRef();
  const folderInput = useRef();
  const [progress, setProgress] = useState(0);
  const [uploadStart, setUploadStart] = useState(false);
  const [uploadDone, setUploadDone] = useState(true);
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [showFolderInput, setShowFolderInput] = useState(false);
  const [data, setData] = useState({
    files:[],
    folders:[]
  });
  useEffect(()=>{
    FolderService.getData(currentFolderId).then((data)=>{
      setData(data);
    })
  }, [currentFolderId]);

  const onClick = () => {
    fileInput.current.click();
  };
  
  const fileSend = () => {
    history.push('/mail');
  }

  function validateFolderName(folderName){
    //special chars not allowed, at least 3 chars, just numbers and letters
    const re = /^([a-zA-Z0-9][^*/><?\|:]*)$/;
    return re.test(folderName);
  }

  const handleFolderSubmit = async (currentFolder, folderName) => {
    if(validateFolderName(folderName)){
      await FolderService.createFolder(currentFolder, folderName);
    }
  }

  const onFiles = async () => {
    const file = fileInput.current.files[0];

    if (!file) return;

    await FileService.uploadFile(file, (pr) => {
      if(pr > 99){
        setTimeout(() => {
          setUploadStart(false);
        }, 3000);
        setUploadDone(false);
      }

      if(pr > 0){
        setUploadStart(true);
        setProgress(pr);
      }
      
    });
  };
  const openFile = () => {

  };
  const openFolder = (folderId)=>{
    setCurrentFolderId(folderId);
  };
  const changeShowInput = () => {
    setShowFolderInput(!showFolderInput);
  }
  return (
    <div id="storage">
      {uploadStart && <div className="progressbar"  data-aos="fade-left">{uploadDone ? (progress.toFixed(1)+" %") : "Done! "  } </div>}
      <div className="storage-cntnr">
        <div className="storagetitle-cntnr"> 
          <h1>File Storage</h1>
        </div>
        <div className='content-cntnr'>
          <div className="files-cntnr">
            <table className='files-table'>
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
                {
                  data.files.map((file, i)=>{
                    return <TableRow
                      Name={file.filename}
                      onClick={openFile}
                      lastModified={file.modified_at}
                      fileSize={file.filesize}
                      folder={false}
                      key={i}
                  /> 
                  })
                }
                {
                  data.folders.map((folder, i)=>{
                    return <TableRow
                      Name={folder.foldername}
                      onClick={openFolder(folder.folder_id)}
                      lastModified={folder.modified_at}
                      fileSize={"-"}
                      folder={true}
                      key={i}
                    />
                  })
                }
                <TableRow
                  Name={"FolderTest"}
                  lastModified={"12.3.2022"}
                  fileSize={"-"}
                  folder={true}
                />
              </tbody>
            </table>
          </div>
          <div className="control-panel">
            <h3 className='icon'><Tool size="22"/>&nbsp;Control Panel </h3><br/>
            <Button
              className={'third-btn'}
              onClick={onClick}
              text={'Upload File'}
            /><Upload size="18"/><br/>
            <Button
              className={'third-btn'}
              text={"Create Folder"}
              onClick={changeShowInput}
            /><FolderPlus size={"18"}/>
            {showFolderInput && (
              <div>
                <input 
                  className='folderInput' 
                  ref={folderInput}
                />
                <Button
                  text={<ArrowRightCircle size={"18"}/>}
                  className={'mini-btn'}
                  onClick={handleFolderSubmit(currentFolderId, folderInput)}
                />
              </div>
            )}<br/>
            <Button 
              className={'third-btn'}
              text={"Send File"}
              onClick={fileSend}
            /><Mail size={"18"}/><br/>
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
