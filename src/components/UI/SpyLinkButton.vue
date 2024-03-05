<template>
  <button class="spy-button" @click="emit('linkClick')">
    {{ props.content }}
  </button>
</template>

<script>
export default {name: 'SpyLinkButton'}
</script>

<script setup>
const emit = defineEmits(['linkClick']);
const props = defineProps({
  content: String
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.spy-button {
  position: relative;
  display: block;
  border: none;
  background: none;
  color: style.$text-color;
  font-family: style.$font-body;
  font-size: 1.5rem;
  padding: .5rem 2rem;
  overflow: hidden;

  @include style.breakpoint(xxl) {
    &:hover {
      cursor: pointer;
      color: style.$accent-color;
    }
  }
}
</style>