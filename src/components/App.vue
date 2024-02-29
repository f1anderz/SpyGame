<template>
  <header>
    <spy-header/>
  </header>
  <main>
    <router-view/>
  </main>
</template>

<script>
import SpyHeader from '@/components/SpyHeader.vue';

export default {
  name: 'App',
  components: {SpyHeader},
}
</script>

<style lang="scss">
@use '@/assets/scss/style';


</style>