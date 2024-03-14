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

import roomAPI from '@/api/room.js';
import RoomsList from '@/components/RoomsList.vue';

const store = useStore();
const router = useRouter();

const rooms = ref([]);

function getRoomsInstant(){
  roomAPI.getRooms().then((result) => {
    rooms.value = result.data.rooms;
    getRooms();
  }).catch((err) => {
    console.log(err)
  });
  getRooms();
}

function getRooms() {
  setTimeout(()=>{
    roomAPI.getRooms().then((result) => {
      rooms.value = result.data.rooms;
      getRooms();
    }).catch((err) => {
      console.log(err)
    });
  }, 5000);
}

onMounted(() => {
  getRoomsInstant();
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