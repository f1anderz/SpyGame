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
        await userAPI.getUser(userID);
    }, logoutUser(context) {

    }
}

export default {
    namespaced: true, state, getters, actions, mutations
}