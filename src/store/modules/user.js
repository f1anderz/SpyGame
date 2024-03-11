import userAPI from '@/api/user.js';
import {reactive} from "vue";

const state = reactive({
    _id: '', username: '', isInGame: false
});

const getters = reactive({
    isUserLoggedIn(state) {
        return state.user._id > 0;
    }
});

const mutations = {
    setID(state, userID) {
        state._id = userID;
    }, setUsername(state, username) {
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
    },
    registerUser(context, registerData){
        return userAPI.register(registerData);
    },
    async setUser(context, userID) {
        let response = await userAPI.getUser(userID);
        context.commit('setID', response.data.user._id);
        context.commit('setUsername', response.data.user.username);
    },
    logoutUser(context) {
        context.commit('setID', '');
        context.commit('setUsername', '');
    }
}

export default {
    namespaced: true, state, getters, actions, mutations
}