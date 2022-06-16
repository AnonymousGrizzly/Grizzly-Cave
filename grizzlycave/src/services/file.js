import axios from 'axios';
import { getItem } from '../helpers/localstorage';

const BASEURL = 'https://www.grizzly-cave.com/api/';

export class FileService {
  static async uploadFile({ file, parentFolderId }, changeProgress) {
    const formData = new FormData();
    formData.append('uploadedFile', file);
    formData.append('parent_folder_id', parentFolderId);
    formData.append('token', getItem('PHPTOKEN'));

    const response = await axios.post(`${BASEURL}/file_upload.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const progress = progressEvent.loaded / progressEvent.total;

        if (typeof changeProgress === 'function') {
          changeProgress(progress * 100);
        }
      },
    });
    return response.data.data;
  }
  static async downloadFile(fileId) {
    const response = await fetch(`${BASEURL}file_download.php`, {
      method: 'POST',
      body: JSON.stringify({
        jwt: getItem('PHPTOKEN'),
        fileId,
      }),
    });
    const arrayBuffer = await response.arrayBuffer();
    const blob = new Blob([arrayBuffer]);
    const url = URL.createObjectURL(blob);
    return url;
  }

  static async deleteFile(fileId) {
    const response = await fetch(`${BASEURL}delete_file.php`, {
      method: 'DELETE',
      body: JSON.stringify({
        jwt: getItem('PHPTOKEN'),
        file_id: fileId,
      }),
    });

    return {
      data: await response.json(),
      success: response.ok,
    };
  }
}
