<template>
  <header>
    <spy-header/>
  </header>
  <main>
    <router-view v-if="store.state.user._id"/>
    <auth-page v-else/>
  </main>
  <footer>
    <spy-footer/>
  </footer>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import {useStore} from 'vuex';
import {inject, onBeforeMount} from 'vue';
import SpyFooter from "@/components/SpyFooter.vue";
import SpyHeader from '@/components/SpyHeader.vue';
import AuthPage from '@/components/AuthPage.vue';

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