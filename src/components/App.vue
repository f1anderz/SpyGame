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
import {inject, onMounted} from 'vue';
import SpyFooter from "@/components/SpyFooter.vue";
import SpyHeader from '@/components/SpyHeader.vue';
import AuthPage from '@/components/AuthPage.vue';
import {useRouter} from 'vue-router';

const store = useStore();
const cookies = inject('$cookies');
const router = useRouter();

onMounted(async () => {
  if (cookies.get('userID')) {
    await store.dispatch('user/setUser', cookies.get('userID'));
  }
  if (cookies.get('roomID')) {
    await store.commit('user/joinRoom', cookies.get('roomID'));
    await router.push(`/SpyGame/room/${cookies.get('roomID')}`);
  }
});
</script>

<style lang="scss">
@use '@/assets/scss/style';


</style>