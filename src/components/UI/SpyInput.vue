<template>
  <input class="spy-input" type="text" v-model="inputValue" :placeholder="props.spyPlaceholder">
</template>

<script>
export default {
  name: "SpyInput"
}
</script>

<script setup>
import {onBeforeMount, ref, watch} from "vue";

const emit = defineEmits([
  'dataInput'
]);

const props = defineProps({
  spyPlaceholder: String,
  preValue: String
});

const inputValue = ref('');

watch(inputValue, (newInputValue) => {
  emit('dataInput', newInputValue)
});

onBeforeMount(() => {
  if (props.preValue) {
    inputValue.value = props.preValue
  }
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.spy-input {
  display: block;
  border: none;
  background: style.$background-color;
  color: style.$text-color;
  font-size: 1rem;
  border-radius: 5rem;
  font-family: style.$font-body;
  padding: .15em .5em;

  @include style.breakpoint(xxl) {
    padding: .25em .7em;
  }
}
</style>