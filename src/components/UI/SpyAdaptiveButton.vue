<template>
  <button class="adaptive-button" @click="emit('adaptiveClick');">
    <span class="adaptive-button-content" v-if="props.adaptProperty">{{ props.adaptValue[0] }}</span>
    <span class="adaptive-button-content" v-else>{{ props.adaptValue[1] }}</span>
  </button>
</template>

<script>
export default {name: "SpyAdaptiveButton"}
</script>

<script setup>
const props = defineProps({
  adaptProperty: Boolean,
  adaptValue: Array

});

const emit = defineEmits(['adaptiveClick']);
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.adaptive-button {
  margin: 0 auto;
  border-radius: 5rem;
  display: block;
  border: .13rem solid style.$accent-color;
  background: style.$background-color;
  font-size: 1.15rem;
  color: style.$text-color;
  font-family: style.$font-body;
  padding: .1rem 1.5rem .2rem;

  &-content{
    @include style.breakpoint(xxl) {
      padding: .2rem 2.5rem .3rem;

      &:hover {
        color: style.$accent-color;
        cursor: pointer;
      }
    }
  }


}
</style>