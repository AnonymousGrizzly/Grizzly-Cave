import axios from 'axios';
import { getItem } from '../helpers/localstorage';

const BASEURL = 'http://localhost:3001/grizzlyphp/api/';

export class FolderService {
    static async getData(parentId){
        const response = await axios.post(`${BASEURL}/get_data.php`, {
            parent_folder_id: parentId,
            jwt: getItem('PHPTOKEN')
        });
        return {
            files: response.data.files,
            folders: []
        };
    }
}
