<template>
  <div class="location">{{ props.location.name }}</div>
</template>

<script>
export default {name: 'Location'}
</script>

<script setup>
const props = defineProps({
  location: Object
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.location {
  font-family: style.$font-body;
  color: style.$text-color;

  @include style.breakpoint(xxl) {
    &:hover {
      color: style.$accent-color;
    }
  }
}
</style>