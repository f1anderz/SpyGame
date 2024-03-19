<template>
  <div class="spy-dropdown">
    <div class="spy-dropdown-header" @click="dropdownOpen = !dropdownOpen"
         :class="{'dropdown-open-header': dropdownOpen}">
      {{ selected.name }}
      <img src="@/assets/img/down-arrow.svg" alt="Down arrow">
    </div>
    <div class="spy-dropdown-container" :class="{'dropdown-open': dropdownOpen}">
      <div class="spy-dropdown-container-options">
        <transition-group name="spy-dropdown-options">
          <div class="spy-dropdown-container-options-item" v-for="option in props.dropdownOptions"
               @click="selected = option; dropdownOpen = !dropdownOpen" :key="option._id"> {{ option.name }}
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {name: 'SpyDropdown'}
</script>

<script setup>
import {onBeforeMount, ref, watch} from 'vue';

const emit = defineEmits(['optionSelect']);

const props = defineProps({
  dropdownOptions: Array
});

const dropdownOpen = ref(false);
const selected = ref({});

onBeforeMount(() => {
  setTimeout(() => {
    selected.value = props.dropdownOptions[0];
  }, 250);
});

watch(selected, (newSelected) => {
  emit('optionSelect', newSelected);
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.spy-dropdown {
  position: relative;

  &-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-family: style.$font-header;
    background: style.$background-color;
    color: style.$text-color;
    padding: .4rem .5rem .4rem .7rem;
    border-radius: 2rem;
    z-index: 3;

    & img {
      display: block;
      width: 1rem;
      height: 1rem;
    }
  }

  &-container {
    position: absolute;
    top: 100%;
    height: 9vh;
    width: 100%;
    display: none;
    background: style.$background-color;
    font-family: style.$font-body;
    color: style.$text-color;
    border-radius: 0 0 1rem 1rem;
    z-index: 2;

    &-options {
      height: 8vh;
      width: 98%;
      flex-direction: column;
      gap: .1rem;
      padding-left: .7rem;
      overflow-y: scroll;
      overflow-x: hidden;

      &-item {
        @include style.breakpoint(xxl) {
          &:hover {
            color: style.$accent-color;
            cursor: pointer;
          }
        }
      }

      &::-webkit-scrollbar {
        width: .5rem;
        background: rgba(0, 0, 0, .1);
        border-radius: 5rem;
      }

      &::-webkit-scrollbar-thumb {
        background: style.$accent-color;
        border-radius: .5rem;
      }
    }
  }
}

.dropdown-open {
  display: flex;
}

.dropdown-open-header {
  border-radius: 1rem 1rem 0 0;
}
</style>