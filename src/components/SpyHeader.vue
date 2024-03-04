<template>
  <div class="spy-header">
    <div class="spy-header-icon"><img src="@/assets/img/favicon.svg" alt="SpyGameIcon"></div>
    <div class="spy-header-name">SpyGame</div>
    <div class="spy-header-profile"><a href="#" @click="logoutUser">{{ store.state.user.username}}</a></div>
  </div>
</template>

<script>
export default {
  name: 'SpyHeader'
}
</script>

<script setup>
import {useStore} from 'vuex';
import {inject} from 'vue';

const store = useStore();

const cookies = inject('$cookies');


function logoutUser(event) {
  store.dispatch('user/logoutUser').then(() => {
    cookies.remove('userID');
  }).catch((err) => {
    console.log(err);
  });
}
</script>

<style scoped lang="scss">

</style>