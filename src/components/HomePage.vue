<template>
  <div class="spy-home-page">
    <div class="spy-home-page-title">Spy<span class="highlight">Game</span></div>
    <div class="spy-home-page-games">
      <SpyButton :content="'Join Room'" @button-click="router.push('/SpyGame/create')"/>
      <SpyButton :content="'Create Room'"/>
    </div>
    <div class="spy-home-page-controls">
      <SpyLinkButton :content="'Locations Workshop'" @link-click="router.push('/SpyGame/locations')"/>
      <SpyLinkButton :content="'Rules'" @link-click="router.push('/SpyGame/rules')"/>
    </div>
  </div>
</template>

<script>
export default {name: 'HomePage'}
</script>

<script setup>
import SpyButton from '@/components/UI/SpyButton.vue';
import SpyLinkButton from '@/components/UI/SpyLinkButton.vue';
import {useRouter} from 'vue-router';

const router = useRouter();
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.spy-home-page {
  height: 100vh;
  background: style.$background-color;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20vh;
  gap: 3rem;

  @include style.breakpoint(s) {
    padding-top: 10vh;
    height: 130vh;
  }


  &-title {
    font-size: 2rem;
    font-family: style.$font-header;
    color: style.$text-color;
  }

  &-games {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  &-controls {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40%;
    border-top: 2px solid style.$accent-color;
    padding-top: 3rem;

    @include style.breakpoint(xs) {
      width: 80%;
    }

    @include style.breakpoint(s) {
      width: 50%;
    }

    @include style.breakpoint(xl) {
      width: 30%;
    }

    @include style.breakpoint(xxl) {
      width: 20%;
    }
  }
}
</style>