<template>
  <div class="password-input">
    <input v-if="visible" type="text" v-model="password" :placeholder="props.spyPlaceholder">
    <input v-else type="password" v-model="password" :placeholder="props.spyPlaceholder">
    <img v-if="visible" src="@/assets/img/hide.svg" alt="Hide" @click="visible = !visible">
    <img v-else src="@/assets/img/show.svg" alt="Show" @click="visible = !visible">
  </div>
</template>

<script>
export default {
  name: "PasswordInput"
}
</script>

<script setup>
import {ref, watch} from "vue";

const emit = defineEmits(['dataInput']);

const props = defineProps({
  spyPlaceholder: String
});

const password = ref('');

const visible = ref(false);

watch(password, (newPassword) => {
  emit('dataInput', newPassword);
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.password-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5rem;
  overflow: hidden;
  background: style.$background-color;

  & input {
    display: block;
    border: none;
    color: style.$text-color;
    background: style.$background-color;
    font-size: 1rem;
    font-family: style.$font-body;
    width: 88%;
    padding: .15em .5em;

    @include style.breakpoint(xxl) {
      padding: .25em .7em;
    }
  }

  & img {
    width: 1rem;
    height: 1rem;
    margin-right: 1rem;

    @include style.breakpoint(xxl) {
      &:hover {
        cursor: pointer;
      }
    }

  }
}
</style>