<template>
  <div class="game-end">
    <div class="game-end-announcement">Game Over
      <winners-list :winners="props.winners"/>
    </div>
  </div>
</template>

<script>
export default {name: 'GameEnd'}
</script>

<script setup>
import WinnersList from '@/components/InGame/WinnersList.vue';

const props = defineProps({
  winners: {
    type: Array,
    required: true
  }
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.game-end {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(100, 100, 100, .1);
  z-index: 3;

  &-announcement {
    padding: 3rem 6rem;
    border-radius: 1rem;
    background: style.$secondary-background-color;
    color: style.$accent-color;
    font-family: style.$font-header;
    font-size: 2rem;
  }
}
</style>