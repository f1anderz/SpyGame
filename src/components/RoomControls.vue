<template>
  <div class="room-controls">
    <div class="room-controls-time">
      <div class="room-controls-time-title">Round time</div>
      <div class="room-controls-time-inputs">
        <spy-input :class="{disabled: endless}" :spy-placeholder="'Round time...'" :pre-value="time"
                   @data-input="(value)=>{time = value}"/>
        <spy-checkbox :option="{name: 'Till guess', checked: endless}" @selected="()=>{endless = !endless}"/>
      </div>
    </div>
    <spy-dropdown :dropdown-options="collections" @option-select="(value)=>{collection = value}"/>
    <div class="room-controls-error" v-if="message">{{ message }}</div>
    <spy-button :content="'Start Game'" @button-click="startGame"/>
  </div>
</template>

<script>
export default {name: 'RoomControls'}
</script>

<script setup>
import SpyButton from '@/components/UI/SpyButton.vue';
import SpyInput from '@/components/UI/SpyInput.vue';
import SpyCheckbox from '@/components/UI/SpyCheckbox.vue';
import SpyDropdown from '@/components/UI/SpyDropdown.vue';
import {inject, onBeforeMount, ref} from 'vue';
import locationsAPI from '@/api/locations.js';
import {useStore} from 'vuex';
import {useRoute, useRouter} from 'vue-router';

const store = useStore();
const router = useRouter();
const route = useRoute();
const cookies = inject('$cookies');

const time = ref('10');
const endless = ref(false);
const collection = ref({});
const collections = ref([]);
const message = ref('');

async function startGame() {
  if (endless.value) {
    time.value = '';
  }
  store.dispatch('room/startGame', {
    roomID: route.params.id,
    collectionID: collection.value._id,
    endless: endless.value,
    time: time.value
  }).then(async (response) => {
    message.value = '';
    cookies.set('gameID', response.data.room.currentGame);
    store.commit('room/setGame', response.data.room.currentGame);
  }).catch((err) => {
    message.value = err.response.data.error.message;
  });
}

onBeforeMount(() => {
  locationsAPI.getCollections().then((response) => {
    collections.value = response.data.collections;
  }).catch((err) => {
    console.log(err);
  });
})
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.room-controls {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  background-color: style.$secondary-background-color;
  border-radius: 1rem;
  padding: 1.5rem 3rem;

  @include style.breakpoint(xs) {
    padding: 1rem .7rem;
  }

  @include style.breakpoint(s) {
    padding: 1rem 2rem;
  }

  @include style.breakpoint(m) {
    padding: 1rem 2rem;
  }

  &-time {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: .7rem;

    &-title {
      font-size: 1.2rem;
      color: style.$text-color;
      font-family: style.$font-body;
    }

    &-inputs {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 1.2rem;

      & label {
        margin-top: -.2rem;
      }
    }
  }

  &-error {
    padding-left: .5rem;
    color: red;
    font-family: style.$font-body;
  }
}

.disabled {
  pointer-events: none;
  filter: opacity(.5);
}
</style>