<template>
  <div class="user-list-item">
    <div class="user-list-item-nickname">{{ props.user.user.username }}</div>
    <div class="user-list-item-score">{{ props.user.score }}</div>
    <div class="user-list-item-controls" v-if="props.isHost">

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

  }

  &-score {
    margin-left: auto;
  }

  &-controls {
    display: flex;
  }
}
</style>