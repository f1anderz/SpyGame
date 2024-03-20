import roomAPI from '@/api/room.js'
import {reactive} from 'vue';

const state = reactive({
    _id: '', users: [], gameID: ''
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
    }, roomInGame: (state) => {
        return state.gameID.length > 0;
    }
});

const mutations = {
    setID(state, roomID) {
        state._id = roomID;
    }, setUsers(state, users) {
        state.users = users;
    }, setGame(state, gameID) {
        state.gameID = gameID;
    }, endGame(state) {
        state.gameID = '';
    }, roomCrash(state){
        state._id = '';
        state.users = [];
        state.gameID = '';
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
        context.state._id = '';
        context.state.users = [];
        context.state.gameID = '';
        return await roomAPI.leaveRoom(roomInfo);
    }, async kickUser(context, kickInfo) {
        return await roomAPI.kickUser(kickInfo);
    }, async startGame(context, gameInfo) {
        return await roomAPI.startGame(gameInfo);
    }
}

export default {
    namespaced: true, state, getters, actions, mutations
}