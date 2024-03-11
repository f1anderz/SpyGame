<template>
  <div class="room-page">
    <div class="room-page-title">Room {{ store.state.room._id }}</div>
    <div class="room-page-users">Users: {{ store.state.room.users }}</div>
    <div class="room-page-controls" v-if="isHost">
      Controls
    </div>
  </div>
</template>

<script>
export default {name: 'RoomPage'}
</script>

<script setup>
import {useStore} from 'vuex';
import {onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';

const store = useStore();
const router = useRouter();
const route = useRoute();

const isHost = ref(false);

onMounted(async () => {
  await store.dispatch('room/getRoom', route.params.id);
  isHost.value = store.state.room.host._id === store.state.user._id;
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.create-room {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: style.$background-color;
}
</style>