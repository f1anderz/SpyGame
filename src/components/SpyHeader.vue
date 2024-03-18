<template>
  <div class="spy-header">
    <img class="spy-header-icon" src="@/assets/img/favicon.svg" alt="SpyGameIcon" @click="router.push('/SpyGame/')">
    <div class="spy-header-name" @click="router.push('/SpyGame/')">SpyGame</div>
    <div class="spy-header-profile" @click="logoutUser" v-if="store.state.user.username">
      {{ store.state.user.username }}
    </div>
    <div class="spy-header-profile" v-else>Sign in</div>
  </div>
</template>

<script>
export default {
  name: 'SpyHeader'
}
</script>

<script setup>
import {useStore} from 'vuex';
import {inject} from 'vue';
import {useRouter} from "vue-router";

const store = useStore();
const router = useRouter();

const cookies = inject('$cookies');


function logoutUser() {
  store.dispatch('user/logoutUser').then(() => {
    cookies.remove('user');
  }).catch((err) => {
    console.log(err);
  });
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.spy-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: style.$secondary-background-color;

  @include style.breakpoint(xs) {
    padding: .4rem 3%;
    gap: .3rem;
  }

  @include style.breakpoint(s) {
    padding: .4rem 5%;
    gap: .3rem;
  }

  @include style.breakpoint(m) {
    padding: .4rem 4%;
    gap: .4rem;
  }

  @include style.breakpoint(l) {
    padding: .4rem 6%;
    gap: .5rem;
  }

  @include style.breakpoint(xl) {
    padding: .4rem 7%;
    gap: .5rem;
  }

  @include style.breakpoint(xxl) {
    padding: .4rem 15%;
    gap: .5rem;
  }

  &-icon {
    display: block;
    width: 2.5rem;
    height: 2.5rem;

    @include style.breakpoint(xxl) {
      &:hover {
        cursor: pointer;
      }
    }
  }

  &-name {
    color: style.$text-color;
    font-family: style.$font-header;

    @include style.breakpoint(xxl) {
      &:hover {
        cursor: pointer;
      }
    }
  }

  &-profile {
    color: style.$text-color;
    font-family: style.$font-body;
    margin-left: auto;

    @include style.breakpoint(xxl) {
      &:hover {
        color: style.$accent-color;
        cursor: pointer;
      }
    }
  }
}
</style>