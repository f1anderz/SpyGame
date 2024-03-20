<template>
  <div class="rooms-list">
    <transition-group name="rooms-list">
      <rooms-list-item v-for="room in props.rooms" :room="room" :key="room._id"
                       @click="router.push(`/room/${room._id}`)"/>
    </transition-group>
  </div>
</template>

<script>
export default {name: 'RoomsList'}
</script>

<script setup>
import RoomsListItem from '@/components/InRoom/RoomsListItem.vue';
import {useRouter} from 'vue-router';

const router = useRouter();
const props = defineProps({
  rooms: Array
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.rooms-list {
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: .3rem;

  @include style.breakpoint(xs){
    width: 95%;
  }

  @include style.breakpoint(s){
    width: 55%;
  }

  @include style.breakpoint(m){
    width: 55%;
  }
}
</style>