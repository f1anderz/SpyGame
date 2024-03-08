<template>
  <div class="locations-page" @click="closeModal">
    <div class="locations-page-controls">
      <div class="locations-page-controls-header">Suggest <span class="highlight">new content</span></div>
      <div class="locations-page-controls-content">
        <spy-button-mini :content="'New Collection'" @buttonClick="formMode = 'C'"/>
        <spy-button-mini :content="'New Location'" @buttonClick="formMode = 'L'"/>
      </div>
    </div>
    <div class="locations-page-collections">
      <div class="locations-page-collections-header">Available <span class="highlight">collections</span></div>
      <list-locations-collection :collections="collections"/>
    </div>
    <suggest-form v-if="formMode" :form-mode="formMode" @suggestion="suggestMade"/>
    <alert-window :is-hidden="alertHidden" :message="alertMessage"/>
  </div>
</template>

<script>
export default {name: 'LocationsWorkshopPage'}
</script>

<script setup>
import SpyButtonMini from '@/components/UI/SpyButtonMini.vue';
import {onBeforeMount, ref} from 'vue';

import api from '@/api/locations.js';
import ListLocationsCollection from '@/components/ListLocationsCollections.vue';
import SuggestForm from '@/components/SuggestForm.vue';
import AlertWindow from '@/components/UI/AlertWindow.vue';

const collections = ref([]);

const formMode = ref('');

const alertHidden = ref(true);
const alertMessage = ref('');

function closeModal(event) {
  if (event.target.classList[0] === 'suggest-page') {
    formMode.value = '';
  }
}

function suggestMade() {
  alertMessage.value = 'Thank you for suggestion !';
  alertHidden.value = false;
  setTimeout(() => {
    alertHidden.value = true;
  }, 750);
  formMode.value = '';
}

onBeforeMount(() => {
  api.getCollections().then((result) => {
    collections.value = result.data.locationsCollection;
  }).catch((err) => {
    console.log(err)
  });
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.locations-page {
  position: relative;
  height: 100vh;
  background: style.$background-color;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 5vh 0;

  @include style.breakpoint(xs) {
    height: 120vh;
  }

  @include style.breakpoint(s) {
    height: 210vh;
  }

  @include style.breakpoint(l) {
    height: 120vh;
  }

  @include style.breakpoint(xl) {
    height: 120vh;
  }

  &-collections {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @include style.breakpoint(xs) {
      width: 80%;
    }

    @include style.breakpoint(s) {
      width: 70%;
    }

    @include style.breakpoint(m) {
      width: 70%;
    }

    @include style.breakpoint(l) {
      width: 60%;
    }

    @include style.breakpoint(xl) {
      width: 50%;
    }

    @include style.breakpoint(xxl) {
      width: 40%;
    }

    &-header {
      text-align: center;
      font-family: style.$font-header;
      color: style.$text-color;
    }
  }

  &-controls {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: .7rem;

    &-header {
      font-family: style.$font-header;
      color: style.$text-color;
    }

    &-content {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

  }
}
</style>