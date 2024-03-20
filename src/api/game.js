import axios from 'axios';
import api from '@/api/index.js';

export default {
    async getGame(gameID) {
        return await axios.get(`${api.link}/games/${gameID}`, {
            headers: {
                'x-api-key': api.key
            }
        });
    }
}