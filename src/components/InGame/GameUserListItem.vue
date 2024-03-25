<template>
  <div class="game-user-list-item" :class="{disabled: props.user.kicked, 'hover-highlight': !props.user.kicked}">
    <div class="game-user-list-item-username">{{ props.user.user.username }}</div>
    <div class="game-user-list-item-controls">
      <img v-if="store.state.user._id !== props.user.user._id && !props.user.kicked"
           :class="{disabled: store.state.game.suspects < 1 || store.state.game.kicked}"
           class="game-user-list-item-controls-suspect" src="@/assets/img/detective.svg" alt="Suspect"
           @click="emit('spyGuess', props.user._id)">
      <img v-if="!props.user.kicked" class="game-user-list-item-controls-active"
           :class="{disabled: props.user.suspectsLeft < 1}" src="@/assets/img/star.svg"
           alt="Active">
    </div>
  </div>
</template>

<script>
export default {name: 'GameUserListItem'}
</script>

<script setup>
import {useStore} from 'vuex';

const store = useStore();
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
}

.hover-highlight {
  @include style.breakpoint(xxl) {
    &:hover {
      color: style.$accent-color;
    }
  }
}
</style>