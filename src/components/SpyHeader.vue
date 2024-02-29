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
import {onMounted, ref} from 'vue';

const store = useStore();

const username = ref('username');

onMounted(() => {
  setTimeout(()=>{
    username.value = store.state.user.username
  }, 250)
})
</script>

<style scoped lang="scss">

</style>