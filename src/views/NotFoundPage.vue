<template>
  <div class="not-found-page">
    <div class="not-found-page-error">404</div>
    <div class="not-found-page-content">Oops! Page you were looking for not found</div>
    <div class="not-found-page-link" @click="router.push('/SpyGame/')">Back to <span class="highlight">Homepage</span>
    </div>
  </div>
</template>

<script>
export default {name: 'NotFoundPage'}
</script>

<script setup>
import {useRouter} from 'vue-router';

const router = useRouter();
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.not-found-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20vh;
  background: style.$background-color;
  font-family: style.$font-body;
  color: style.$text-color;

  @include style.breakpoint(s){
    padding-top: 7vh;
  }

  &-error {
    font-family: style.$font-header;
    color: style.$accent-color;
    font-size: 12rem;

    @include style.breakpoint(xs) {
      font-size: 9rem;
    }
  }

  &-content {
    font-size: 1.5rem;

    @include style.breakpoint(xs) {
      text-align: center;
      font-size: 1.2rem;
    }
  }

  &-link {
    font-size: 1.3rem;

    @include style.breakpoint(xxl) {
      &:hover {
        cursor: pointer;
        color: style.$accent-color;

        & .highlight {
          color: style.$text-color;
        }
      }
    }
  }
}
</style>