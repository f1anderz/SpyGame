<template>
  <div class="spy-home-page" @click="closeModal">
    <div class="spy-home-page-title">Spy<span class="highlight">Game</span></div>
    <div class="spy-home-page-games">
      <SpyButton :content="'Join Room'" @button-click="router.push('/join')"/>
      <SpyButton :content="'Create Room'" @button-click="formVisible = true"/>
    </div>
    <div class="spy-home-page-controls">
      <SpyLinkButton :content="'Locations Workshop'" @link-click="router.push('/locations')"/>
      <SpyLinkButton :content="'Rules'" @link-click="router.push('/rules')"/>
    </div>
    <create-room-form v-if="formVisible" @room-create="roomCreated"/>
  </div>
</template>

<script>
export default {name: 'HomePage'}
</script>

<script setup>
import SpyButton from '@/components/UI/SpyButton.vue';
import SpyLinkButton from '@/components/UI/SpyLinkButton.vue';
import {useRouter} from 'vue-router';
import CreateRoomForm from '@/components/CreateRoomForm.vue';
import {inject, ref} from 'vue';
import {useStore} from 'vuex';

const store = useStore();
const router = useRouter();
const cookies = inject('$cookies');

const formVisible = ref(false);

function roomCreated(roomID) {
  cookies.set('roomID', roomID);
  store.commit('user/joinRoom', roomID);
  formVisible.value = false;
  router.push(`/room/${roomID}`);
}

function closeModal(event) {
  if (event.target.classList[0] === 'create-room') {
    formVisible.value = false;
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.spy-home-page {
  position: relative;
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