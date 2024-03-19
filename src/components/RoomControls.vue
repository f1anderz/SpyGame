<template>
  <div class="room-controls">
    <div class="room-controls-time">
      <div class="room-controls-time-title">Round time</div>
      <div class="room-controls-time-inputs">
        <spy-input :spy-placeholder="'Round time...'" :pre-value="time" @data-input="(value)=>{time = value}"/>
        <spy-checkbox :option="{name: 'Till guess', checked: endless}" @selected="()=>{endless = !endless}"/>
      </div>
    </div>
    <spy-dropdown :dropdown-options="collections" @option-select="(value)=>{collection = value}"/>
    <spy-button :content="'Start Game'"/>
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
import {onBeforeMount, ref} from 'vue';
import locationsAPI from '@/api/locations.js';

const time = ref('10');
const endless = ref(false);
const collection = ref({});
const collections = ref([]);

onBeforeMount(() => {
  locationsAPI.getCollections().then((response) => {
    collections.value = response.data.collections;
  }).catch((err) => {
    console.log(err);
  })
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
    gap: .5rem;

    &-title {
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
}
</style>