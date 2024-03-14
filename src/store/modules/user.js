import userAPI from '@/api/user.js';
import {reactive} from "vue";

const state = reactive({
    _id: '', username: '', roomID: ''
});

const getters = reactive({});

const mutations = {
    setID(state, userID) {
        state._id = userID;
    }, setUsername(state, username) {
        state.username = username;
    }, joinRoom(state, roomID) {
        state.roomID = roomID;
    }, leaveRoom(state) {
        state.roomID = '';
    }
}

const actions = {
    loginUser(context, loginData) {
        return userAPI.login(loginData);
    }, registerUser(context, registerData) {
        return userAPI.register(registerData);
    }, async setUser(context, userID) {
        let response = await userAPI.getUser(userID);
        context.commit('setID', response.data.user._id);
        context.commit('setUsername', response.data.user.username);
    }, logoutUser(context) {
        context.commit('setID', '');
        context.commit('setUsername', '');
    }
}

export default {
    namespaced: true, state, getters, actions, mutations
}