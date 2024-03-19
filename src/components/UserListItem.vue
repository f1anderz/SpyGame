<template>
  <div class="user-list-item">
    <div class="user-list-item-nickname">{{ props.user.user.username }}
      <img src="@/assets/img/crown.svg" alt="Host" v-if="props.user.isHost">
    </div>
    <div class="user-list-item-score">{{ props.user.score }}</div>
    <div class="user-list-item-controls" v-if="props.isHost">
      Controls
    </div>
  </div>
</template>

<script>
export default {name: 'UserListItem'}
</script>

<script setup>
const props = defineProps({
  user: Object,
  isHost: Boolean
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.user-list-item {
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
    display: flex;
  }
}
</style>