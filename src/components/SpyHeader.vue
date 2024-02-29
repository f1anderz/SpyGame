<template>
  <div class="spy-header">
    <div class="spy-header-icon"><img src="@/assets/img/favicon.svg" alt="SpyGameIcon"></div>
    <div class="spy-header-name">SpyGame</div>
    <div class="spy-header-profile"><a href="#">{{ username }}</a></div>
  </div>
</template>

<script>
export default {
  name: 'SpyHeader'
}
</script>

<script setup>
import {useStore} from 'vuex';
import {ref} from 'vue';

const store = useStore();

let username = ref(store.state.user.username);
</script>

<style scoped lang="scss">

</style>