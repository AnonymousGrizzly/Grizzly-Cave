import { getItem } from '../helpers/localstorage';

const BASEURL = 'http://localhost:3001/grizzlyphp/api/';

export class AuthService {
  static async createUser(user) {
    const url = BASEURL + 'create_user.php';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(user),
    });
    const wasSuccessful = response.status === 201;
    const data = await response.json();
    return {
      token: data.jwt,
      user: data.user,
      wasSuccessful,
      message: data.message,
    };
  }

  static async loginUser(user) {
    const url = BASEURL + 'login.php';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(user),
    });
    const wasSuccessful = response.status === 200;
    const data = await response.json();
    return {
      token: data.jwt,
      user: data.user,
      wasSuccessful,
      message: data.message,
    };
  }
  static async updateUser(user) {
    const url = BASEURL + 'update_user.php';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        ...user,
        jwt: getItem('PHPTOKEN'),
      }),
    });
    return response;
  }
  static async deleteUser() {
    const url = BASEURL + 'delete_user.php';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        jwt: getItem('PHPTOKEN'),
      }),
    });
    return response;
  }
  static async getUserInfo() {
    const url = BASEURL + 'get_user.php';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        jwt: getItem('PHPTOKEN'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.data;
  }
  static async validateToken() {
    const url = BASEURL + 'validate_token.php';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        jwt: getItem('PHPTOKEN'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return {
      wasSuccessful: response.status === 200,
      data: await response.json(),
    };
  }
}
