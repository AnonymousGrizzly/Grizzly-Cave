import axios from 'axios';

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
  }
}
