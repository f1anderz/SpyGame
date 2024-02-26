const state = {
    username: '',
    isInGame: false
};

const getters = {}

const actions = {}

const mutations = {
    joinGame(state) {
        state.isInGame = true;
    }
    ,
    leaveGame(state) {
        state.isInGame = false;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}