<template>
  <div class="rooms-list-item">
    <div class="rooms-list-item-id">Room {{ props.room._id }}</div>
    <div class="rooms-list-item-members">{{ props.room.users.length }}/16</div>
  </div>
</template>

<script>
export default {name: 'RoomsListItem'}
</script>

<script setup>
const props = defineProps({
  room: Object
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.rooms-list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-family: style.$font-body;
  color: style.$text-color;

  @include style.breakpoint(xxl) {
    &:hover {
      color: style.$accent-color;
      cursor: pointer;
    }
  }

  &-id, &-members {
    @include style.breakpoint(xxl) {
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>