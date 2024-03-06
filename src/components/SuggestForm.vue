<template>
  <div class="suggest-page">
    <div class="suggest-page-form">
      <div class="suggest-page-form-header">Suggest new content</div>
      <spy-input :spy-placeholder="'Location name...'" @dataInput="(value)=>{locationName = value}"
                 v-if="props.formMode === 'L'"/>
      <spy-input v-else :spy-placeholder="'Collection name...'" @dataInput="(value)=>{collectionName = value}"/>
      <adaptive-button :adapt-value="['Suggest Location','Suggest Collection']" :adapt-property="formMode === 'L'"/>
    </div>
  </div>
</template>

<script>
export default {name: 'SuggestForm'}
</script>

<script setup>
import SpyInput from '@/components/UI/SpyInput.vue';
import {ref} from 'vue';
import AdaptiveButton from '@/components/UI/AdaptiveButton.vue';

const props = defineProps({
  formMode: String
});

const locationName = ref('');
const collectionName = ref('');
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.suggest-page {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, .3);
  height: 100vh;
  top: 0;
  left: 0;
  width: 100%;

  &-form {
    background: style.$secondary-background-color;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;

    @include style.breakpoint(xs){
      width: 80%;
    }

    @include style.breakpoint(s){
      width: 50%;
    }

    @include style.breakpoint(m){
      width: 45%;
    }

    @include style.breakpoint(l){
      width: 35%;
    }

    @include style.breakpoint(xl){
      width: 30%;
    }

    @include style.breakpoint(xxl) {
      width: 25%;
    }

    &-header {
      font-family: style.$font-body;
      color: style.$text-color;
      font-size: 1.2rem;
    }
  }
}
</style>