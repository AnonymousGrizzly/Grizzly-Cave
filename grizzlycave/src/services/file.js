import axios from 'axios';
import { getItem } from '../helpers/localstorage';

const BASEURL = 'http://localhost:3001/grizzlyphp/api/';

export class FileService {
  static async uploadFile(file, changeProgress) {
    const formData = new FormData();
    formData.append('uploadedFile', file);
    formData.append('token', localStorage.getItem('PHPTOKEN'));

    await axios.post(`${BASEURL}/FileSystem/file_upload.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const progress = progressEvent.loaded / progressEvent.total;

        changeProgress(progress * 100);
      },
    });
    return file;
  }
  static async downloadFile(fileId) {
  
  const response = await fetch(`${BASEURL}/FileSystem/file_download.php`, {
    method: "POST",
    body: JSON.stringify({
      jwt: getItem('PHPTOKEN'),
      fileId
    }),
   });
    const arrayBuffer = await response.arrayBuffer()
    const blob = new Blob([arrayBuffer]);
    const url = URL.createObjectURL(blob);  
    return url;

  }
}
