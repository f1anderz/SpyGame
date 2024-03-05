<template>
  <button class="spy-button" @click="emit('buttonClick')">
    {{ props.content }}
  </button>
</template>

<script>
export default {name: 'SpyButton'}
</script>

<script setup>
const emit = defineEmits(['buttonClick']);
const props = defineProps({
  content: String
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.spy-button {
  position: relative;
  display: block;
  border: .15rem solid style.$accent-color;
  border-radius: 5rem;
  color: style.$accent-color;
  background: style.$secondary-background-color;
  font-family: style.$font-body;
  font-size: 1.5rem;
  padding: .5rem 2rem;
  overflow: hidden;

  @include style.breakpoint(xxl) {
    &:hover {
      cursor: pointer;
      color: style.$text-color;
      background: style.$accent-color;
    }
  }
}
</style>