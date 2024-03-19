import roomAPI from '@/api/room.js'
import {reactive} from 'vue';

const state = reactive({
    _id: '', users: []
});

const getters = reactive({
    getHostID: (state) => {
        let hostID = '';
        state.users.forEach((user) => {
            if (user.isHost) {
                hostID = user.user._id;
            }
        });
        return hostID;
    }
});

const mutations = {
    setID(state, roomID) {
        state._id = roomID;
    }, setUsers(state, users) {
        state.users = users;
    }
}

const actions = {
    async getRoom(context, roomID) {
        return await roomAPI.getRoom(roomID);
    }, async getRooms() {
        return await roomAPI.getRooms();
    }, async createRoom(context, roomInfo) {
        return await roomAPI.createRoom(roomInfo);
    }, async joinRoom(context, roomInfo) {
        return await roomAPI.joinRoom(roomInfo);
    }, async leaveRoom(context, roomInfo) {
        return await roomAPI.leaveRoom(roomInfo);
    }
}

export default {
    namespaced: true, state, getters, actions, mutations
}