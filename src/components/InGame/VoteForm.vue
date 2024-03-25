<template>
  <div class="vote-form">
    <div class="vote-form-title">Kick {{ props.suspect }}?</div>
    <div class="vote-form-controls">
      <div class="vote-form-controls-button"
           @click="store.dispatch('game/voteSpy',{
             gameID: store.state.game._id,
             userID: store.state.user._id,
             spyID: store.getters['game/getSuspects'][0]._id,
             vote: false
           })" :class="{disabled: props.voted, 'hover-highlight': !props.voted}">No
      </div>
      <div class="vote-form-controls-button"
           @click="store.dispatch('game/voteSpy',{
             gameID: store.state.game._id,
             userID: store.state.user._id,
             spyID: store.getters['game/getSuspects'][0]._id,
             vote: true})" :class="{disabled: props.voted, 'hover-highlight': !props.voted}">Yes
      </div>
    </div>
  </div>
</template>

<script>
export default {name: 'VoteForm'}
</script>

<script setup>
import {useStore} from 'vuex';

const store = useStore();
const props = defineProps({
  suspect: {
    type: String,
    required: true
  },
  voted: {
    type: Boolean,
    required: true
  }
});
</script>

<style scoped lang="scss">
@use "@/assets/scss/style";

.vote-form {
  position: absolute;
  top: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0 auto;
  padding: 1rem 2rem;
  border-radius: 1rem;
  background: style.$secondary-background-color;
  color: style.$text-color;

  &-title {
    font-family: style.$font-header;
    font-size: 1.5rem;
  }

  &-controls {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    font-family: style.$font-body;
    font-size: 1.3rem;
  }
}

.hover-highlight {
  @include style.breakpoint(xxl) {
    &:hover {
      cursor: pointer;
      color: style.$accent-color;
    }
  }
}
</style>