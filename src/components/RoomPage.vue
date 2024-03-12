<template>
  <div class="room-page">
    <div class="room-page-title">Room <span class="room-page-title-id">{{ store.state.room._id }}</span></div>
    <user-list :user-list="store.state.room.users" :is-host="isHost"/>
    <room-controls v-if="isHost" :collections="collections"/>
  </div>
</template>

<script>
export default {name: 'RoomPage'}
</script>

<script setup>
import {useStore} from 'vuex';
import {onBeforeMount, onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import UserList from '@/components/UserList.vue';
import RoomControls from '@/components/RoomControls.vue';
import api from '@/api/locations.js';

const store = useStore();
const router = useRouter();
const route = useRoute();

const collections = ref({});
const isHost = ref(false);

onBeforeMount(() => {
  api.getCollections().then((result) => {
    collections.value.list = result.data.locationsCollection;
    collections.value.selected = collections.value.list[0];
  }).catch((err) => {
    console.log(err)
  });
});

onMounted(async () => {
  await store.dispatch('room/getRoom', route.params.id);
  isHost.value = store.state.room.host._id === store.state.user._id;
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.room-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5vh;
  height: 100vh;
  background: style.$background-color;
  padding-top: 4vh;

  &-title {
    font-family: style.$font-body;
    color: style.$text-color;
    font-size: 1.2rem;
    text-align: center;

    @include style.breakpoint(xs){
      font-size: 1.1rem;
    }

    &-id {
      font-family: style.$font-header;
      color: style.$accent-color;
    }
  }
}
</style>