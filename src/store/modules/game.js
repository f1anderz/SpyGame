import {reactive} from 'vue';
import gameAPI from '@/api/game.js';

const state = reactive({
    _id: '', spy: '', users: [], featuredLocation: '', locations: '', endless: false, roundTime: 0
});

const getters = reactive({
    userInGame: (state, userID) => {
        state.users.forEach((user) => {
            if (user === userID) {
                return true;
            }
        });
        return false;
    }
});

const mutations = {
    setGame(state, gameInfo) {
        state._id = gameInfo._id;
        state.spy = gameInfo.spy.user._id;
        state.users = gameInfo.users;
        state.featuredLocation = gameInfo.featuredLocation._id;
        state.locations = gameInfo.locationsCollection._id;
        state.endless = gameInfo.endless;
        state.roundTime = gameInfo.roundTime;
    }
};

const actions = {
    async getGame(context, gameID) {
        return await gameAPI.getGame(gameID);
    }
};

export default {
    namespaced: true, state, getters, actions, mutations
};