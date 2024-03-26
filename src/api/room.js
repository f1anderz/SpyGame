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
    }, async kickUser(kickInfo) {
        return await axios.patch(`${api.link}/rooms/kick/${kickInfo.roomID}`, {
            userID: kickInfo.userID
        }, {
            headers: {
                'Content-Type': 'application/json', 'x-api-key': api.key
            }
        });
    }, async startGame(gameInfo) {
        return await axios.patch(`${api.link}/rooms/startGame/${gameInfo.roomID}`, {
            collectionID: gameInfo.collectionID, endless: gameInfo.endless, roundTime: gameInfo.time
        }, {
            headers: {
                'Content-Type': 'application/json', 'x-api-key': api.key
            }
        });
    }, async endGame(gameInfo) {
        return await axios.patch(`${api.link}/rooms/endGame/${gameInfo.roomID}`, {
            gameID: gameInfo.gameID
        }, {
            headers: {
                'x-api-key': api.key
            }
        });
    }
}