import axios from 'axios';
import api from '@/api/index.js';

export default {
    async getGame(gameID) {
        return await axios.get(`${api.link}/games/${gameID}`, {
            headers: {
                'x-api-key': api.key
            }
        });
    }, async guessLocation(gameInfo) {
        return await axios.patch(`${api.link}/games/guessLocation/${gameInfo.gameID}`, {
            locationID: gameInfo.locationID
        }, {
            headers: {
                'Content-Type': 'application/json', 'x-api-key': api.key
            }
        });
    }, async guessSpy(gameInfo) {
        return await axios.patch(`${api.link}/games/guessSpy/${gameInfo.gameID}`, {
            spyID: gameInfo.spyID
        }, {
            headers: {
                'Content-Type': 'application/json', 'x-api-key': api.key
            }
        });
    }
}