import axios from 'axios';
import api from '@/api/index.js';

export default {
    async getRoom(roomID) {
        return await axios.get(`${api.link}/rooms/${roomID}`, {
            headers: {
                'x-api-key': api.key
            }
        });
    }, async getRooms() {
        return await axios.get(`${api.link}/rooms`, {
            headers: {
                'x-api-key': api.key
            }
        });
    }, async createRoom(roomInfo) {
        return await axios.post(`${api.link}/rooms`, {
            hostID: roomInfo.host, password: roomInfo.password
        }, {
            headers: {
                'Content-Type': 'application/json', 'x-api-key': api.key
            }
        });
    }, async joinRoom(roomInfo) {
        return await axios.patch(`${api.link}/rooms/join/${roomInfo.roomID}`, {
            userID: roomInfo.userID, password: roomInfo.password
        }, {
            headers: {
                'Content-Type': 'application/json', 'x-api-key': api.key
            }
        });
    }, async leaveRoom(roomInfo) {
        return await axios.patch(`${api.link}/rooms/leave/${roomInfo.roomID}`, {
            userID: roomInfo.userID
        }, {
            headers: {
                'Content-Type': 'application/json', 'x-api-key': api.key
            }
        });
    }
}