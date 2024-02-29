import axios from 'axios';
import api from '@/api';

export default {
    async register(registerData) {
        return await axios.post('http://localhost:3333/users', {
            username: registerData.username, login: registerData.login, password: registerData.password
        }, {
            headers: {
                'Content-Type': 'application/json', 'x-api-key': api.key
            }
        });
    }, async login(loginData) {
        return await axios.post('http://localhost:3333/users/login', {
            login: loginData.login, password: loginData.password
        }, {
            headers: {
                'Content-Type': 'application/json', 'x-api-key': api.key
            }
        });
    }, async getUser(id) {
        return await axios.get(`http://localhost:3333/users/${id}`, {
            headers: {
                'x-api-key': api.key
            }
        });
    }
}