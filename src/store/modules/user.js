import userAPI from '@/api/user.js';
import {reactive} from "vue";

const state = reactive({
    _id: '', username: '', roomID: ''
});

const getters = reactive({
    isLoggedIn: (state) => {
        return state._id.length > 0;
    }
});

const mutations = {
    setUser(state, user) {
        state._id = user._id;
        state.username = user.username;
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
    }, logoutUser(context) {
        context.state._id = '';
        context.state.username = '';
    }
}

export default {
    namespaced: true, state, getters, actions, mutations
}