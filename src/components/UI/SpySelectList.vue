<template>
  <div class="spy-dropdown">
    <div class="spy-dropdown-header">{{ props.dropdownOptions.header }}</div>
    <div class="spy-dropdown-options">
      <transition-group name="spy-dropdown-options">
        <spy-checkbox v-for="option in props.dropdownOptions.list" :key="option._id" :option="option"
                      @selected="(value)=>{emit('optionSelect', value)}"/>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {name: 'SpySelectList'}
</script>

<script setup>
import SpyCheckbox from '@/components/UI/SpyCheckbox.vue';

const emit = defineEmits(['optionSelect']);

const props = defineProps({
  dropdownOptions: Object
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.spy-dropdown {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: .2rem;
  border: .15rem solid style.$background-color;
  border-radius: .4rem;
  padding: .4rem;

  &-header {
    font-family: style.$font-header;
    color: style.$accent-color;
  }

  &-options {
    display: flex;
    flex-direction: column;
    gap: .1rem;
    color: style.$text-color;
    padding-left: 1rem;
    height: 20vh;
    overflow-y: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: .5rem;
      background: rgba(0, 0, 0, .1);
      border-radius: 5rem;
    }

    &::-webkit-scrollbar-thumb {
      background: style.$background-color;
      border-radius: .5rem;
    }
  }
}
</style>