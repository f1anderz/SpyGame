<template>
  <div class="rules-item">
    <div class="rules-item-header">{{ props.rule.header }}</div>
    <transition-group name="rules-item-list">
      <div class="rules-item-body" v-for="listItem in props.rule.body" :key="listItem">{{ listItem }}</div>
    </transition-group>

  </div>
</template>

<script>
export default {name: 'RulesItem'}
</script>

<script setup>
const props = defineProps({
  rule: Object
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.rules-item {
  display: flex;
  flex-direction: column;
  gap: .2rem;
  color: style.$text-color;

  @include style.breakpoint(xxl) {
    &:hover &-header {
      color: style.$accent-color;
    }
  }

  &-header {
    font-family: style.$font-header;
  }

  &-body {
    padding-left: 2.5rem;
    font-family: style.$font-body;
  }
}
</style>