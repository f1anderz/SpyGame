<template>
  <div class="spy-game-page">Game: {{ route.params.id }}</div>
</template>

<script>
export default {name: 'GamePage'}
</script>

<script setup>
import {useRoute} from 'vue-router';
import {useStore} from 'vuex';
import {inject, onMounted} from 'vue';

const route = useRoute();
const store = useStore();
const cookies = inject('$cookies');

onMounted(() => {
  console.log(store.getters['game/userInGame'],)
  console.log(route.params.id)
})
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.spy-game-page {
}
</style>