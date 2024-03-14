import roomAPI from '@/api/room.js'
import {reactive} from 'vue';

const state = reactive({
    _id: '', users: [], host: '',
});

const getters = {};

const mutations = {
    setID(state, roomID) {
        state._id = roomID;
    }, setHost(state, hostID) {
        state.host = hostID;
    }, setUsers(state, users) {
        state.users = users;
    }
}

const actions = {
    async getRoom(context, roomID) {
        context.commit('setID', roomID);
        let response = await roomAPI.getRoom(context.state._id);
        context.commit('setHost', response.data.room.host);
        context.commit('setUsers', response.data.room.users);
    }, createRoom(context, roomInfo) {
        return roomAPI.createRoom(roomInfo);
    }, async joinRoom(context, roomInfo) {
        return await roomAPI.joinRoom(roomInfo);
    }, async leaveRoom(context, roomInfo){
        return await roomAPI.leaveRoom(roomInfo)
    }
}

export default {
    namespaced: true, state, getters, actions, mutations
}