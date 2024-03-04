<template>
  <label class="switch-button" :for="props.switchTarget">{{ props.prompt[0] }}
    <button class="switch-button-action" :id="props.switchTarget" @click="emit('switchClick');">
      {{ props.prompt[1] }}
    </button>
  </label>
</template>

<script>
export default {
  name: "SwitchButton"
}
</script>

<script setup>
const props = defineProps({
  switchTarget: String,
  prompt: Array
});

const emit = defineEmits(['switchClick']);
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.switch-button {
  &-action {
    display: inline;
    border: none;
    background: none;
    font-size: 1rem;
    color: style.$text-color;
    font-family: style.$font-body;

    &:hover {
      color: style.$accent-color;
      cursor: pointer;
    }
  }
}
</style>