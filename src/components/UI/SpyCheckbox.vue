<template>
  <label class="spy-checkbox">
    {{ props.option.name }}
    <input type="checkbox" :checked="props.option.selected" @click="emit('selected', props.option)">
    <span class="spy-checkbox-checkmark"></span>
  </label>
</template>

<script>
export default {name: 'SpyCheckbox'}
</script>

<script setup>
const emit = defineEmits(['selected'])

const props = defineProps({
  option: Object,
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.spy-checkbox {
  position: relative;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  user-select: none;
  padding-left: 1.3rem;

  color: style.$text-color;
  font-family: style.$font-body;

  @include style.breakpoint(xxl) {
    &:hover {
      color: style.$accent-color;
      cursor: pointer;
    }
  }

  & input {
    position: absolute;
    height: 0;
    width: 0;
    opacity: 0;
    cursor: pointer;
  }

  & input:checked ~ &-checkmark {
    background: style.$accent-color;
  }

  & &-checkmark:after {
    left: .3rem;
    top: .2rem;
    width: .2rem;
    height: .4rem;
    border: solid #ffffff;
    border-width: 0 .2rem .2rem 0;
    transform: rotate(45deg);
  }

  & input:checked ~ &-checkmark:after {
    display: block;
  }

  &-checkmark {
    position: absolute;
    top: .2rem;
    left: 0;
    height: 1rem;
    width: 1rem;
    border-radius: .3rem;
    background-color: #ffffff;

    &:after {
      content: "";
      position: absolute;
      display: none;
    }
  }
}
</style>