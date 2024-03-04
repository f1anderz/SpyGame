<template>
  <header>
    <spy-header/>
  </header>
  <main>
    <router-view/>
  </main>
  <footer>
    <spy-footer/>
  </footer>
</template>

<script>
import SpyHeader from '@/components/SpyHeader.vue';

export default {
  name: 'App',
  components: {SpyHeader},
}
</script>

<script setup>
import {useStore} from 'vuex';
import {inject, onBeforeMount} from 'vue';
import SpyFooter from "@/components/SpyFooter.vue";

const store = useStore();
const cookies = inject('$cookies');

onBeforeMount(async () => {
  if (cookies.get('userID')) {
    await store.dispatch('user/setUser', cookies.get('userID'));
  }
});
</script>

<style lang="scss">
@use '@/assets/scss/style';


</style>