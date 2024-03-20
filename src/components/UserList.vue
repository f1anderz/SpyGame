<template>
  <div class="user-list">
    <transition-group name="user-list">
      <user-list-item v-for="user in props.userList" :user="user" :key="user._id" :is-host="props.isHost"
                      @kick-user="(value)=>{emit('kickUser', value)}"/>
    </transition-group>
  </div>
</template>

<script>
export default {name: 'UserList'}
</script>

<script setup>
import UserListItem from '@/components/UserListItem.vue';

const emit = defineEmits(['kickUser']);
const props = defineProps({
  userList: Array,
  isHost: Boolean
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.user-list {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;

  @include style.breakpoint(xs) {
    width: 80%;
  }

  @include style.breakpoint(l) {
    width: 50%;
  }

  @include style.breakpoint(xl) {
    width: 40%;
  }

  @include style.breakpoint(xxl) {
    width: 35%;
  }
}
</style>