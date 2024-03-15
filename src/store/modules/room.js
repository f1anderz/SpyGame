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
        let response = await roomAPI.getRoom(roomID);
        console.log(response.data.room);
        if (response.data.room) {
            context.commit('setID', roomID);
            context.commit('setHost', response.data.room.host);
            context.commit('setUsers', response.data.room.users);
            return response.data.room._id;
        }
    }, createRoom(context, roomInfo) {
        return roomAPI.createRoom(roomInfo);
    }, async joinRoom(context, roomInfo) {
        return await roomAPI.joinRoom(roomInfo);
    }, async leaveRoom(context, roomInfo) {
        return await roomAPI.leaveRoom(roomInfo)
    }
}

export default {
    namespaced: true, state, getters, actions, mutations
}