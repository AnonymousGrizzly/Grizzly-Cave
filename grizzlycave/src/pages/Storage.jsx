import React, { useRef, useState } from 'react';
import Button from '../components/Button';
import '../designs/Storage.css';
import { FileService } from '../services/file';

function Storage() {
  const fileInput = useRef();
  const [progress, setProgress] = useState(0);
  const [uploadStart, setUploadStart] = useState(false);
  const [uploadDone, setUploadDone] = useState(true);

  const onClick = () => {
    fileInput.current.click();
  };
  const createFolder= ()=>{

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
  
  return (
    <div id="storage">
      {uploadStart && <div className="progressbar"  data-aos="fade-left">{uploadDone ? (progress.toFixed(1)+" %") : "Done! "  } </div>}
      <div className="storage-cntnr">
        <div className="storagetitle-cntnr"> 
          <h1>File Storage</h1>
        </div>
        <div className='content-cntnr'>
          <div className="files-cntnr">
          </div>
          <div className="control-panel">
            <h3>Control Panel</h3><br/>
            <Button
              className={'secondary-btn'}
              onClick={onClick}
              text={'Upload File'}
            /><br/><br/>
            <Button
              className={'secondary-btn'}
              text={"Create Folder"}
              onClick={createFolder}
            />
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
