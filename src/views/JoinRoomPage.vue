<template>
  <div class="join-room-page">
    <div class="join-room-page-header">Join <span class="highlight">room</span></div>
    <rooms-list :rooms="rooms" v-if="rooms.length > 0"/>
    <div class="join-room-page-message" v-else>No active rooms found</div>
  </div>
</template>

<script>
export default {name: 'JoinRoomPage'}
</script>

<script setup>
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import {onMounted, ref} from 'vue';

import RoomsList from '@/components/InRoom/RoomsList.vue';

const store = useStore();
const router = useRouter();

const rooms = ref([]);

function getRooms() {
  if(!(store.getters['user/isInRoom'])) {
    setTimeout(() => {
      store.dispatch('room/getRooms').then((response) => {
        if (rooms.value !== response.data.rooms) {
          rooms.value = response.data.rooms;
        }
      });
      getRooms();
    }, 5000);
  }
}

onMounted(async () => {
  store.dispatch('room/getRooms').then((response) => {
    rooms.value = response.data.rooms;
  });
  getRooms();
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.join-room-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding-top: 5vh;
  background: style.$background-color;

  &-header {
    font-size: 1.35rem;
    font-family: style.$font-header;
    color: style.$text-color;
  }

  &-message {
    font-family: style.$font-body;
    color: style.$text-color;
  }
}
</style>