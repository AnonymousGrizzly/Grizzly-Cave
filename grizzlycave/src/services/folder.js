import axios from 'axios';
import { getItem } from '../helpers/localstorage';

const BASEURL = 'http://localhost:3001/grizzlyphp/api/';

export class FolderService {
  static async getData(parentId) {
    const response = await axios.post(`${BASEURL}/get_data.php`, {
      parent_folder_id: parentId,
      jwt: getItem('PHPTOKEN'),
    });
    return {
      files: response.data.files,
      folders: response.data.folders,
    };
  }
  static async createFolder(parentId, folderName) {
    const response = await axios.post(`${BASEURL}/create_folder.php`, {
      parent_folder_id: parentId,
      foldername: folderName,
      jwt: getItem('PHPTOKEN'),
    });
    return response.data.data;
  }
  static async deleteFolder(folderId) {
    // const response = await axios.delete(`${BASEURL}/delete_folder.php`, {
    //   folder_id: folderId,
    //   jwt: getItem('PHPTOKEN'),
    // });
    // return {
    //   data: response.data,
    //   status: response.
    // }

    const response = await fetch(`${BASEURL}delete_folder.php`, {
      method: 'POST',
      body: JSON.stringify({
        folder_id: folderId,
        jwt: getItem('PHPTOKEN'),
      }),
    });

    return {
      data: await response.json(),
      success: response.ok,
    };
  }
  static async updateFolder(folderId, folderName) {
    const response = await axios.post(`${BASEURL}/update_folder.php`, {
      foldername: folderName,
      folder_id: folderId,
      jwt: getItem('PHPTOKEN'),
    });
    return response;
  }
  static async openParentFolder(folderId){
    const response = await axios.post(`${BASEURL}/get_parent_folder.php`, {
      folder_id: folderId,
      jwt: getItem('PHPTOKEN'),
    });
    return response.data.data;
  }


}
