import React, { useRef, useState } from 'react';
import Button from '../components/Button';
import '../designs/Storage.css';
import { FileService } from '../services/file';
import {Upload, FolderPlus, Mail, Tool} from 'react-feather';
import { useHistory } from 'react-router';
import TableRow from '../components/TableRow';

function Storage() {
  const history = useHistory();
  const fileInput = useRef();
  const [progress, setProgress] = useState(0);
  const [uploadStart, setUploadStart] = useState(false);
  const [uploadDone, setUploadDone] = useState(true);

  const onClick = () => {
    fileInput.current.click();
  };
  const createFolder = ()=>{

  }
  const fileSend = () => {
    history.push('/mail');
  }

  const onFiles = async () => {
    const file = fileInput.current.files[0];

    if (!file) return;

    await FileService.uploadFile(file, (pr) => {
      if(pr > 99){
        setTimeout(() => { //prever a dela
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
  const openFile = ()=>{

  };
  const openFolder = ()=>{

  };
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
                <TableRow
                  Name={"FileTest"}
                  onClick={openFile}
                  lastModified={"12.3.2022"}
                  fileSize={"1300 b"}
                  folder={false}
                />
                <TableRow
                  Name={"FolderTest"}
                  onClick={openFolder}
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
              onClick={createFolder}
            /><FolderPlus size={"18"}/><br/>
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
