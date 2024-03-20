<template>
  <div class="room-page">
    <div class="room-page-title">Room <span class="room-page-title-id">{{ route.params.id }}</span></div>
    <div class="room-page-member" v-if="store.state.user.roomID === route.params.id">
      <div class="room-page-member-announcement" v-if="store.getters['room/roomInGame']">Room currently in game</div>
      <div class="room-page-member-invite"
           @click="navigator.clipboard.writeText(`https://f1anderz.github.io/SpyGame/${route.fullPath}`);">Invite
        friends to room<img src="../assets/img/invite.svg" alt="Invite"></div>
      <user-list :user-list="store.state.room.users" :is-host="isHost" @kick-user="kickUser"/>
      <div class="room-page-member-controls">
        <spy-button-mini :content="'Leave room'" @button-click="leaveRoom"/>
      </div>
      <room-controls v-if="isHost" :collections="collections"/>
    </div>
    <div class="room-page-guest" v-else>
      <div class="room-page-guest-header">Join this room!</div>
      <div class="room-page-guest-error" v-if="message">{{ message }}</div>
      <spy-input :spy-placeholder="'Room password...'" @data-input="(value)=>{roomPassword = value}"/>
      <spy-button :content="'Join Room'" @button-click="joinRoom"/>
    </div>
    <alert-window :message="alertMessage" :is-hidden="isHidden"/>
  </div>
</template>

<script>
export default {name: 'RoomPage'}
</script>

<script setup>
import {useStore} from 'vuex';
import {inject, onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import UserList from '@/components/InRoom/UserList.vue';
import RoomControls from '@/components/InRoom/RoomControls.vue';
import SpyButtonMini from '@/components/UI/SpyButtonMini.vue';
import SpyInput from '@/components/UI/SpyInput.vue';
import SpyButton from '@/components/UI/SpyButton.vue';
import AlertWindow from '@/components/UI/SpyAlertWindow.vue';

const store = useStore();
const router = useRouter();
const route = useRoute();
const cookies = inject('$cookies');

const isHost = ref(false);
const isHidden = ref(true);
const roomPassword = ref('');
const message = ref('');
const alertMessage = ref('');
const collections = ref([]);

async function joinRoom() {
  store.dispatch('room/joinRoom', {
    roomID: route.params.id,
    userID: store.state.user._id,
    password: roomPassword.value
  }).then((result) => {
    cookies.set('roomID', result.data.roomID);
    store.commit('user/joinRoom', result.data.roomID);
    getRoom();
  }).catch((err) => {
    message.value = err.response.data.error.message;
  });
}

async function leaveRoom() {
  await store.commit('user/leaveRoom');
  await store.dispatch('room/leaveRoom', {
    roomID: cookies.get('roomID'),
    userID: store.state.user._id
  });
  cookies.remove('roomID');
  cookies.remove('gameID');
  await router.push('/')
}

function kickUser(event) {
  store.dispatch('room/kickUser', {roomID: route.params.id, userID: event}).then().catch((err) => {
    console.log(err)
  });
}

async function getRoom() {
  if (store.getters['user/isInRoom']) {
    setTimeout(() => {
      store.dispatch('room/getRoom', store.state.room._id).then(async (response) => {
        if (response.data.room) {
          let flag = false;
          response.data.room.users.forEach((user) => {
            if (user.user._id === store.state.user._id) {
              flag = true;
            }
          });
          if (flag) {
            await store.commit('room/setID', response.data.room._id);
            await store.commit('room/setUsers', response.data.room.users);
            if (response.data.room.currentGame) {
              cookies.set('gameID', response.data.room.currentGame._id);
              store.commit('room/setGame', response.data.room.currentGame._id);
              let userInGame = false;
              response.data.room.currentGame.users.forEach((user) => {
                if (user.user._id === store.state.user._id) {
                  userInGame = true;
                }
              });
              if (userInGame) {
                await router.push(`/game/${response.data.room.currentGame._id}`);
              }
            }
            await getRoom();
          } else {
            isHidden.value = false;
            store.commit('user/leaveRoom');
            store.commit('room/roomCrash');
            cookies.remove('roomID');
            cookies.remove('gameID');
            alertMessage.value = 'You were kicked';
            setTimeout(() => {
              isHidden.value = true;
              router.push('/')
            }, 750);
          }
        } else {
          isHidden.value = false;
          store.commit('user/leaveRoom');
          store.commit('room/roomCrash');
          cookies.remove('roomID');
          cookies.remove('gameID');
          alertMessage.value = 'Host closed room';
          setTimeout(() => {
            isHidden.value = true;
            router.push('/')
          }, 750);
        }
      }).catch((err) => {
        console.log(err);
      });
    }, 2500);
  }
}

onMounted(async () => {
  store.dispatch('room/getRoom', route.params.id).then((response) => {
    if (response.data.room) {
      store.commit('room/setID', response.data.room._id);
      store.commit('room/setUsers', response.data.room.users);
      if (store.getters['room/getHostID'] === store.state.user._id) {
        isHost.value = true;
      }
      getRoom();
    } else {
      console.log("No room")
    }
  }).catch((err) => {
    console.log(err);
  });
});
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

    &-announcement {
      color: style.$text-color;
      font-family: style.$font-body;
      text-align: center;
    }

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
    align-items: center;
    gap: 1rem;
    margin: 0 auto;

    & .spy-input {
      background: style.$secondary-background-color;
    }

    &-header {
      color: style.$text-color;
      font-family: style.$font-body;
    }

    &-error {
      padding-left: .5rem;
      color: red;
      font-family: style.$font-body;
    }
  }

  & .spy-alert-window {
    background: style.$background-color;
  }
}
</style>