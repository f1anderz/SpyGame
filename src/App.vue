<template>
  <header>
    <spy-header/>
  </header>
  <main>
    <auth-page v-if="!(store.getters['user/isLoggedIn'])"/>
    <router-view v-else/>
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
import AuthPage from '@/views/AuthPage.vue';
import {useRouter} from 'vue-router';

const store = useStore();
const cookies = inject('$cookies');
const router = useRouter();

onBeforeMount(() => {
  if (cookies.isKey('user')) {
    store.commit('user/setUser', cookies.get('user'));
  }
  if (cookies.isKey('roomID')) {
    store.commit('user/joinRoom', cookies.get('roomID'));
  }
  if (cookies.isKey('gameID')) {
    store.commit('room/setGame', cookies.get('gameID'));
  }
});
</script>

<style lang="scss">
@use '@/assets/scss/style';
</style>