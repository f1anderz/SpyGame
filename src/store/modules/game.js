import {reactive} from 'vue';
import gameAPI from '@/api/game.js';

const state = reactive({
    _id: '',
    spy: '',
    users: [],
    featuredLocation: {},
    locations: [],
    endless: false,
    roundTime: '',
    suspects: 0,
    suspected: false,
    voted: false,
    votes: 0,
    kicked: false,
    winners: []
});

const getters = reactive({
    getSuspects: (state) => {
        return state.users.filter((user) => {
            return user.suspected === true
        });
    },
    gameEnd: (state) => {
        return state.winners.length > 0;
    }
});

const mutations = {
    setGame(state, gameInfo) {
        state._id = gameInfo._id;
        state.spy = gameInfo.spy.user._id;
        state.users = gameInfo.users;
        state.featuredLocation = {name: gameInfo.featuredLocation.name, image: gameInfo.featuredLocation.image}
        state.locations = gameInfo.locationsCollection.locations;
        state.endless = gameInfo.endless;
        if (gameInfo.winners) {
            state.winners = gameInfo.winners;
        }
        if (!state.endless) {
            let now = new Date();
            let timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
            let [hours1, minutes1, seconds1] = timeString.split(':').map(Number);
            let [hours2, minutes2, seconds2] = gameInfo.roundStartTime.split(':').map(Number);
            let differenceSeconds = (hours1 * 3600 + minutes1 * 60 + seconds1) - (hours2 * 3600 + minutes2 * 60 + seconds2);
            if (differenceSeconds < 0) {
                differenceSeconds += 24 * 3600;
            }
            differenceSeconds %= 3600;
            let rtDiff = gameInfo.roundTime * 60 - (((Math.floor(differenceSeconds / 60)) * 60) + (differenceSeconds % 60));
            state.roundTime = `${String(Math.floor(rtDiff / 60)).padStart(2, '0')}:${String(rtDiff % 60).padStart(2, '0')}`;
        }
    }, setGameConfig(state, userID) {
        state.users.forEach((user) => {
            if (user.user._id === userID) {
                state.suspects = user.suspectsLeft;
                state.suspected = user.suspected;
                state.voted = user.voted;
                state.votes = user.votes;
                state.kicked = user.kicked;
            }
        });
    }
};

const actions = {
    async getGame(context, gameID) {
        return await gameAPI.getGame(gameID);
    }, async guessLocation(context, gameInfo) {
        return await gameAPI.guessLocation(gameInfo);
    }, async suspectSpy(context, gameInfo) {
        return await gameAPI.suspectSpy(gameInfo);
    }, async voteSpy(context, gameInfo) {
        return await gameAPI.voteSpy(gameInfo);
    }
};

export default {
    namespaced: true, state, getters, actions, mutations
};