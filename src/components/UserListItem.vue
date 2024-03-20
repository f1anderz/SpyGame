<template>
  <div class="user-list-item">
    <div class="user-list-item-nickname">{{ props.user.user.username }}
      <img src="@/assets/img/crown.svg" alt="Host" v-if="props.user.isHost">
    </div>
    <div class="user-list-item-score">{{ props.user.score }}</div>
    <div class="user-list-item-controls" v-if="props.isHost && !props.user.isHost">
      <img src="@/assets/img/kick_user.svg" alt="Kick" @click="emit('kickUser', props.user.user._id)">
    </div>
  </div>
</template>

<script>
export default {name: 'UserListItem'}
</script>

<script setup>
const emit = defineEmits(['kickUser']);
const props = defineProps({
  user: Object,
  isHost: Boolean
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.user-list-item {
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  color: style.$text-color;
  font-family: style.$font-body;

  @include style.breakpoint(xxl) {
    &:hover {
      color: style.$accent-color;
    }
  }

  &-nickname {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: .5rem;

    & img {
      width: 1rem;
      height: 1rem;
      margin-top: .2rem;
    }
  }

  &-score {
    margin-left: auto;
  }

  &-controls {
    position: absolute;
    left: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 1rem;

    & img {
      width: 1rem;
      height: 1rem;

      @include style.breakpoint(xxl) {
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>