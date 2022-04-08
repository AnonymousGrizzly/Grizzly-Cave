import { getItem } from '../helpers/localstorage';

const BASEURL = 'http://localhost:3001/grizzlyphp/api/';

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
}
