<template>
  <div class="room-page">
    <div class="room-page-title">Room <span class="room-page-title-id">{{ store.state.room._id }}</span></div>
    <div class="room-page-member" v-if="store.state.user.roomID === route.params.id">
      <div class="room-page-member-invite" @click="">Invite
        friends to room<img src="../assets/img/invite.svg" alt="Invite"></div>
      <user-list :user-list="store.state.room.users" :is-host="isHost"/>
      <div class="room-page-member-controls">
        <spy-button-mini :content="'Leave room'" @button-click=""/>
      </div>
      <room-controls v-if="isHost" :collections="collections"/>
    </div>
    <div class="room-page-guest" v-else>
      <div class="room-page-guest-header">Join this room!</div>
      <spy-input :spy-placeholder="'Room password...'" @data-input="(value)=>{roomPassword = value}"/>
      <spy-button :content="'Join Room'" @button-click=""/>
    </div>
    <alert-window :message="message" :is-hidden="isHidden"/>
  </div>
</template>

<script>
export default {name: 'RoomPage'}
</script>

<script setup>
import {useStore} from 'vuex';
import {inject, onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import UserList from '@/components/UserList.vue';
import RoomControls from '@/components/RoomControls.vue';
import SpyButtonMini from '@/components/UI/SpyButtonMini.vue';
import SpyInput from '@/components/UI/SpyInput.vue';
import SpyButton from '@/components/UI/SpyButton.vue';
import AlertWindow from '@/components/UI/SpyAlertWindow.vue';

const store = useStore();
const router = useRouter();
const route = useRoute();
const cookies = inject('$cookies');

const collections = ref({});
const isHost = ref(false);
const isHidden = ref(true);
const roomPassword = ref('');
const message = ref('');

</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.room-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
  height: 100vh;
  background: style.$background-color;
  padding-top: 4vh;

  &-title {
    font-family: style.$font-body;
    color: style.$text-color;
    font-size: 1.2rem;
    text-align: center;

    @include style.breakpoint(xs) {
      font-size: 1.1rem;
    }

    &-id {
      font-family: style.$font-header;
      color: style.$accent-color;
    }
  }

  &-member {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5vh;

    &-invite {
      color: style.$text-color;
      font-family: style.$font-body;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;

      & img {
        width: 1rem;
        height: 1rem;

        @include style.breakpoint(xxl) {
          &:hover {
            cursor: pointer;
          }
        }
      }

      @include style.breakpoint(xxl) {
        &:hover {
          color: style.$accent-color;
          cursor: pointer;
        }
      }
    }
  }

  &-guest {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &-header {
      color: style.$text-color;
      font-family: style.$font-body;
    }
  }
}
</style>