<template>
  <div class="spy-game-page">
    <div class="spy-game-page-title">Game <span class="highlight">{{ route.params.id }}</span></div>
    <div class="spy-game-page-featured">
      <div class="spy-game-page-featured-location">Location</div>
      <div class="spy-game-page-featured-users">User list</div>
    </div>
    <div class="spy-game-page-locations">Locations</div>
    <div class="spy-game-page-spy-controls">Spy guess</div>
  </div>
</template>

<script>
export default {name: 'GamePage'}
</script>

<script setup>
import {useRoute, useRouter} from 'vue-router';
import {useStore} from 'vuex';
import {inject, onMounted} from 'vue';

const router = useRouter();
const route = useRoute();
const store = useStore();
const cookies = inject('$cookies');

onMounted(() => {
  if (route.params.id !== store.state.room.gameID) {
    router.push('/');
  } else {
    store.dispatch('game/getGame', store.state.room.gameID).then((response) => {
      if (response.data.game) {
        console.log(response.data.game)
        store.commit('game/setGame', response.data.game);
      } else {
        store.commit('user/leaveRoom');
        store.commit('room/roomCrash');
        cookies.remove('roomID');
        cookies.remove('gameID');
        router.push('/');
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5vh;
  background: style.$background-color;

  &-title {
    color: style.$text-color;
    font-family: style.$font-header;
  }

  &-featured {
    display: flex;
    flex-direction: row;
  }
}
</style>