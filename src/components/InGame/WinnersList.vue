<script setup>
const props = defineProps({
  winners: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="winners-list">
    Congratulations
    <transition-group name="winners">
      <div class="winners-list-item" v-for="winner in winners" :key="winner._id">
        {{ winner.user.username }}
      </div>
    </transition-group>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/style';

.winners-list {
  display: flex;
  flex-direction: column;
  color: style.$text-color;
  font-family: style.$font-header;
  font-size: 1.4rem;

  &-item {
    padding-left: 1rem;
    color: style.$text-color;
    font-family: style.$font-body;
    font-size: 1.2rem;
  }
}
</style>