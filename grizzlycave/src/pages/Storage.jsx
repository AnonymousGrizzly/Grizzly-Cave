import React, { useRef, useState } from 'react';
import Button from '../components/Button';
import '../designs/Storage.css';
import { FileService } from '../services/file';

function Storage() {
  const fileInput = useRef();
  const [progress, setProgress] = useState(0);

  const onClick = () => {
    fileInput.current.click();
  };

  const onFiles = async () => {
    const file = fileInput.current.files[0];

    if (!file) return;

    await FileService.uploadFile(file, (pr) => {
      setProgress(pr);
    });
  };

  return (
    <div>
      <div className="storage-cntnr">
        <div className="storagetitle-cntnr">
          <h1>File Storage</h1>
        </div>
        <div className="files-cntnr"></div>
        <div className="control-panel">
          <Button
            className={'secondary-btn'}
            onClick={onClick}
            text={'Upload'}
          ></Button>

          <div>{progress.toFixed(1)} %</div>
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
