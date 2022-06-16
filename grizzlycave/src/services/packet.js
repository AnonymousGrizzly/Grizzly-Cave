import { getItem } from '../helpers/localstorage';

const BASEURL = 'https://www.grizzly-cave.com/api/';

export class PacketService {
  static async createPacket({ fileId, username, shortMessage, recieverId }) {
    const response = await fetch(`${BASEURL}create_packet.php`, {
      method: 'POST',
      body: JSON.stringify({
        file_id: fileId,
        username,
        short_message: shortMessage,
        user_id: recieverId,
        jwt: getItem('PHPTOKEN'),
      }),
    });

    return {
      data: await response.json(),
      success: response.ok,
    };
  }

  static async fetchAll() {
    const response = await fetch(`${BASEURL}get_packets.php`, {
      method: 'POST',
      body: JSON.stringify({
        jwt: getItem('PHPTOKEN'),
      }),
    });

    return response.json();
  }

  static async deletePacket(packetId) {
    const response = await fetch(`${BASEURL}delete_packet.php`, {
      method: 'POST',
      body: JSON.stringify({
        jwt: getItem('PHPTOKEN'),
        packet_id: packetId,
      }),
    });

    return {
      data: await response.json(),
      success: response.ok,
    };
  }

  static async transferPacket(packetId) {
    const response = await fetch(`${BASEURL}transfer_packet.php`, {
      method: 'POST',
      body: JSON.stringify({
        jwt: getItem('PHPTOKEN'),
        packet_id: packetId,
      }),
    });

    return {
      success: response.ok,
      data: await response.json(),
    };
  }
}
