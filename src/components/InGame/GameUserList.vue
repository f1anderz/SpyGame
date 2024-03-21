<template>
  <div class="game-user-list">
    <transition-group name="game-user-list">
      <game-user-list-item v-for="user in props.users" :user="user" :key="user._id"
                           @spy-guess="(value)=>{emit('spyGuess', value)}"/>
    </transition-group>
  </div>
</template>

<script>
export default {name: 'GameUserList'}
</script>

<script setup>
import GameUserListItem from '@/components/InGame/GameUserListItem.vue';

const emit = defineEmits(['spyGuess']);
const props = defineProps({
  users: {
    type: Array,
    required: true
  }
});
</script>

<style scoped lang="scss">
@use "@/assets/scss/style";

.game-user-list {
  max-height: 10rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 0 1rem;
  padding: 1rem;
  border: .15rem solid style.$accent-color;
  border-radius: 1rem;
}
</style>