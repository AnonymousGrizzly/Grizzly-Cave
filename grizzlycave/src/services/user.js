import axios from 'axios';
import { getItem } from '../helpers/localstorage';

const BASEURL = 'https://www.grizzly-cave.com/api/';

export class UserService {
  static async checkUsername(username) {
    const response = await fetch(`${BASEURL}check_username.php`, {
      method: 'POST',
      body: JSON.stringify({
        username,
      }),
    });

    return {
      success: response.ok,
      data: await response.json(),
    };
  }
  static async getGraphData() {
    const response = await axios.post(`${BASEURL}graphs_data.php`, {
      jwt: getItem('PHPTOKEN'),
    });
    return {
      overall_time: response.data.overall_time,
      last_time: response.data.last_time,
      storage_size: response.data.storage_size,
      num_of_files: response.data.num_of_files,
    };
  }
}
