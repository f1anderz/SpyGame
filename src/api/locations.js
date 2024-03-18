import axios from 'axios';
import api from '@/api';

export default {
    async getCollections() {
        return await axios.get(`${api.link}/locationsCollections`, {
            headers: {
                'x-api-key': api.key
            }
        });
    }, async getCollection(collectionID) {
        return await axios.get(`${api.link}/locationsCollections/${collectionID}`, {
            headers: {
                'x-api-key': api.key
            }
        });
    }, async postCollection(collection) {
        return await axios.post(`${api.link}/locationsCollections`, {
            collectionName: collection.name, locations: collection.locations
        }, {
            headers: {
                'Content-Type': 'application/json', 'x-api-key': api.key
            }
        });
    }, async getLocations() {
        return await axios.get(`${api.link}/locations`, {
            headers: {
                'x-api-key': api.key
            }
        });
    }, async postLocation(locationName) {
        return await axios.post(`${api.link}/locations`, {
            locationName: locationName
        }, {
            headers: {
                'Content-Type': 'application/json', 'x-api-key': api.key
            }
        });
    }
}