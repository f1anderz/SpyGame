<template>
  <div class="create-room">
    <div class="create-room-form">
      <spy-input :spy-placeholder="'Room password...'" @data-input="(value)=>{password = value}"/>
      <spy-button :content="'Create Room'" @button-click="createRoom"/>
    </div>
  </div>
</template>

<script>
export default {name: 'CreateRoomForm'}
</script>

<script setup>
import SpyInput from '@/components/UI/SpyInput.vue';
import SpyButton from '@/components/UI/SpyButton.vue';
import {ref} from 'vue';
import {useStore} from 'vuex';

const emit = defineEmits(['roomCreate']);
const store = useStore();

const password = ref('');

async function createRoom() {
  let result = await store.dispatch('room/createRoom', {host: store.state.user._id, password: password.value});
  emit('roomCreate', result.data.roomID);
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.create-room {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 35vh;
  background: rgba(0, 0, 0, .3);
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;

  &-form {
    background: style.$secondary-background-color;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;

    @include style.breakpoint(xs) {
      width: 80%;
    }

    @include style.breakpoint(s) {
      width: 50%;
    }

    @include style.breakpoint(m) {
      width: 45%;
    }

    @include style.breakpoint(l) {
      width: 35%;
    }

    @include style.breakpoint(xl) {
      width: 30%;
    }

    @include style.breakpoint(xxl) {
      width: 25%;
    }
  }
}
</style>