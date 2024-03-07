import axios from 'axios';
import api from '@/api';

export default {
    async getCollections() {
        return await axios.get('https://spygame.onrender.com/locationsCollections', {
            headers: {
                'x-api-key': api.key
            }
        });
    }, async getCollection(collectionID) {
        return await axios.get(`https://spygame.onrender.com/locationsCollections/${collectionID}`, {
            headers: {
                'x-api-key': api.key
            }
        });
    }, async postCollection(collection) {
        return await axios.post('https://spygame.onrender.com/locationsCollections', {
            collectionName: collection.name, locations: collection.locations
        }, {
            headers: {
                'Content-Type': 'application/json', 'x-api-key': api.key
            }
        });
    }, async getLocations() {
        return await axios.get('https://spygame.onrender.com/locations', {
            headers: {
                'x-api-key': api.key
            }
        });
    }, async getLocation(locationID) {
        return await axios.get(`https://spygame.onrender.com/locations/${locationID}`, {
            headers: {
                'x-api-key': api.key
            }
        });
    }, async postLocation(locationName) {
        return await axios.post('https://spygame.onrender.com/locations', {
            locationName: locationName
        }, {
            headers: {
                'Content-Type': 'application/json', 'x-api-key': api.key
            }
        });
    }
}