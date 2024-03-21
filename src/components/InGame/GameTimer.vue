<template>
  <div class="game-timer">
    Time left
    <div class="game-timer-value">{{ props.time }}</div>
  </div>
</template>

<script>
export default {name: 'GameTimer'}
</script>

<script setup>
const props = defineProps({
  time: {
    type: String,
    required: true
  }
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.game-timer {
  width: 10rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: .5rem;
  border: .15rem solid style.$accent-color;
  border-radius: 1rem;
  color: style.$text-color;
  font-family: style.$font-body;
  font-size: 1.4rem;

  &-value {
    border-radius: 1rem;
    padding: .5rem 1rem;
    background: style.$secondary-background-color;
  }
}
</style>