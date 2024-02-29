import userAPI from '@/api/user.js';
import {inject} from 'vue';

const state = {
    id: '', username: '', isInGame: false
};

const getters = {
    isUserLoggedIn(state) {
        return state.id.length > 0;
    }
}

const mutations = {
    setID(state, userID) {
        state.id = userID;
    },setUsername(state, username) {
        state.username = username;
    }, joinGame(state) {
        state.isInGame = true;
    }, leaveGame(state) {
        state.isInGame = false;
    }
}

const actions = {
    loginUser(context, loginData) {
        return userAPI.login(loginData);
    }, async setUser(context, userID) {
        const cookies = inject('$cookies');
        cookies.set('userID', userID, "30d");
        let response = await userAPI.getUser(userID);
        context.commit('setID', response.data.user._id);
        context.commit('setUsername', state.username = response.data.user.username);
        return context.state.username;
    }
}

export default {
    namespaced: true, state, getters, actions, mutations
}