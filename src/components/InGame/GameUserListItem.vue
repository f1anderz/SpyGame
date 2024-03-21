<template>
  <div class="game-user-list-item">
    <div class="game-user-list-item-username">{{ props.user.user.username }}</div>
    <div class="game-user-list-item-controls">
      <img class="game-user-list-item-controls-active" v-if="props.user.suspectsLeft > 0" src="@/assets/img/star.svg"
           alt="Active">
      <img :class="{disabled: props.user.suspectsLeft === 0}" class="game-user-list-item-controls-suspect"
           src="@/assets/img/detective.svg" alt="Suspect" @click="emit('spyGuess', props.user._id)">
    </div>
  </div>
</template>

<script>
export default {name: 'GameUserListItem'}
</script>

<script setup>
const emit = defineEmits(['spyGuess']);
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});
</script>

<style scoped lang="scss">
@use "@/assets/scss/style";

.game-user-list-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  color: style.$text-color;

  &-username {
    font-family: style.$font-body;
  }

  &-controls {
    display: flex;
    flex-direction: row;
    gap: .5rem;

    & img {
      height: 1rem;
      width: 1rem;
    }

    &-suspect {
      @include style.breakpoint(xxl) {
        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  @include style.breakpoint(xxl) {
    &:hover {
      color: style.$accent-color;
    }
  }
}

.disabled {
  filter: opacity(.5);

  @include style.breakpoint(xxl) {
    &:hover {
      cursor: not-allowed;
    }
  }
}
</style>