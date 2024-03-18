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
import {inject} from 'vue';
import SpyFooter from "@/components/SpyFooter.vue";
import SpyHeader from '@/components/SpyHeader.vue';
import AuthPage from '@/views/AuthPage.vue';
import {useRouter} from 'vue-router';

const store = useStore();
const cookies = inject('$cookies');
const router = useRouter();


</script>

<style lang="scss">
@use '@/assets/scss/style';
</style>