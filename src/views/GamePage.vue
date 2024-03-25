<template>
  <div class="spy-game-page">
    <div class="spy-game-page-title">Game <span class="highlight">{{ route.params.id }}</span></div>
    <div class="spy-game-page-featured">
      <highlight-card :card="card"/>
      <game-timer v-if="!store.state.game.endless" :time="timeString"/>
      <game-user-list :users="store.state.game.users" @spy-guess="spySuspect"/>
    </div>
    <collection-display :collection="store.state.game.locations" @location-guess="locationGuess"/>
    <vote-form v-if="suspected" :voted="store.state.game.voted" :suspect="suspected"/>
  </div>
</template>

<script>
export default {name: 'GamePage'}
</script>

<script setup>
import {useRoute, useRouter} from 'vue-router';
import {useStore} from 'vuex';
import {inject, onMounted, ref} from 'vue';
import HighlightCard from '@/components/InGame/HiglightCard.vue';
import GameUserList from '@/components/InGame/GameUserList.vue';
import CollectionDisplay from '@/components/InGame/CollectionDisplay.vue';
import GameTimer from '@/components/InGame/GameTimer.vue';
import VoteForm from '@/components/InGame/VoteForm.vue';

const router = useRouter();
const route = useRoute();
const store = useStore();
const cookies = inject('$cookies');

const card = ref({});
const timeString = ref('--:--');
const suspected = ref('');

function locationGuess(value) {
  store.dispatch('game/guessLocation', {
    gameID: store.state.game._id,
    userID: store.state.user._id,
    locationID: value
  }).then((response) => {
    console.log(response.data);
  }).catch((err) => {
    console.log(err)
  });
}

function spySuspect(value) {
  store.dispatch('game/suspectSpy', {
    gameID: store.state.game._id,
    spyID: value,
    userID: store.state.user._id
  }).then((response) => {
    console.log(response.data);
  }).catch((err) => {
    console.log(err)
  });
}

function getGame() {
  setTimeout(() => {
    if (route.params.id !== store.state.room.gameID) {
      router.push(`/room/${store.state.room._id}`);
    } else {
      store.dispatch('game/getGame', store.state.room.gameID).then(async (response) => {
        if (response.data.game) {
          store.commit('game/setGame', response.data.game);
          store.commit('game/setGameConfig', store.state.user._id);
          if (store.state.game.spy === store.state.user._id) {
            card.value = {name: 'Spy', image: 'spy'};
          } else {
            card.value = store.state.game.featuredLocation;
          }
          if (!store.state.game.endless) {
            timeString.value = `${store.state.game.roundTime}`;
          }
          suspected.value = '';
          if (store.getters['game/getSuspects'].length > 0) {
            suspected.value = store.getters['game/getSuspects'][0].user.username;
          }
          if (store.state.game.winners.length > 0) {

          } else {
            getGame();
          }
        } else {
          cookies.remove('gameID');
          await store.commit('room/endGame');
          await router.push(`/room/${store.state.room._id}`);
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }, 1000);
}

onMounted(() => {
  if (route.params.id !== store.state.room.gameID) {
    router.push('/');
  } else {
    store.dispatch('game/getGame', store.state.room.gameID).then((response) => {
      if (response.data.game) {
        store.commit('game/setGame', response.data.game);
        store.commit('game/setGameConfig', store.state.user._id);
        if (store.state.game.spy === store.state.user._id) {
          card.value = {name: 'Spy', image: 'spy'};
        } else {
          card.value = store.state.game.featuredLocation;
        }
        timeString.value = `${store.state.game.roundTime}`;
        getGame();
      } else {
        store.commit('room/endGame');
        cookies.remove('gameID');
        router.push(`/room/${store.state.room._id}`);
      }
    }).catch((err) => {
      console.log(err);
    })
  }
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.spy-game-page {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
  padding-top: 5vh;
  background: style.$background-color;

  &-title {
    color: style.$text-color;
    font-family: style.$font-header;
  }

  &-featured {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
}
</style>