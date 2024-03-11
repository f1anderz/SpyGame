import {createStore} from 'vuex';
import user from '@/store/modules/user';
import game from '@/store/modules/game';
import room from '@/store/modules/room.js';

export default createStore({
    modules:{
        user,
        game,
        room
    }
})