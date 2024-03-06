import axios from 'axios';
import api from '@/api';

export default {
    async getCollections() {
        return await axios.get('https://spygame.onrender.com/locationsCollections', {
            headers: {
                'Content-Type': 'application/json', 'x-api-key': api.key
            }
        });
    }, async getCollection(collectionID) {
        return await axios.get(`https://spygame.onrender.com/locationsCollections/${collectionID}`, {
            headers: {
                'Content-Type': 'application/json', 'x-api-key': api.key
            }
        });
    }, async getLocation(locationID) {
        return await axios.get(`https://spygame.onrender.com/locations/${locationID}`, {
            headers: {
                'Content-Type': 'application/json', 'x-api-key': api.key
            }
        });
    }
}