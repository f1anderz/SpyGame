<template>
  <div class="join-room-page">
    <div class="join-room-page-header"></div>
    <div class="join-room-page-list"></div>
    <div class="join-room-page-"></div>
    <div class="join-room-page-"></div>
  </div>
</template>

<script>
export default {name: 'JoinRoomPage'}
</script>

<script setup>
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

const store = useStore();
const router = useRouter();
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.join-room-page {

}
</style>