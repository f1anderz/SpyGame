<template>
  <div class="alert-window" :class="{ hidden: props.isHidden }">
    {{ props.message }}
  </div>
</template>

<script>
export default {name: 'AlertWindow'}
</script>

<script setup>
const props = defineProps({
  isHidden: Boolean,
  message: String
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.alert-window{
  position: absolute;
  text-align: center;
  background: style.$secondary-background-color;
  color: style.$text-color;
  font-family: style.$font-body;
  border-radius: 5rem;
  opacity: 1;
  transition: opacity .5s ease;
  margin: 0 auto;
  top: 1rem;
  font-size: 1.3rem;
  padding: .2rem 1.5rem .3rem;
}

.hidden {
  opacity: 0;
}
</style>