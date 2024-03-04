import userAPI from '@/api/user.js';
import {reactive} from "vue";

const state = reactive({
    id: '', username: '', isInGame: false
});

const getters = reactive({
    isUserLoggedIn(state) {
        return state.id.length > 0;
    }
});

const mutations = {
    setID(state, userID) {
        state.id = userID;
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
        context.commit('setUsername', state.username = response.data.user.username);
    },
    logoutUser(context) {
        context.commit('setID', '');
        context.commit('setUsername', '');
    }
}

export default {
    namespaced: true, state, getters, actions, mutations
}