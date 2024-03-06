<template>
  <div class="locations-page">
    <div class="locations-page-controls">
      <div class="locations-page-controls-header">Suggest <span class="highlight">new content</span></div>
      <div class="locations-page-controls-content">
        <SpyButtonMini :content="'New Collection'"/>
        <SpyButtonMini :content="'New Location'"/>
      </div>
    </div>
    <div class="locations-page-collections">
      <div class="locations-page-collections-header">Available <span class="highlight">collections</span></div>
      <ListLocationsCollection :collections="collections"/>
    </div>
  </div>
</template>

<script>
export default {name: 'LocationsWorkshopPage'}
</script>

<script setup>
import SpyButtonMini from '@/components/UI/SpyButtonMini.vue';
import {onBeforeMount, ref} from 'vue';

import api from '@/api/locations.js';
import ListLocationsCollection from '@/components/UI/ListLocationsCollections.vue';

const collections = ref([]);

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
  height: 100vh;
  background: style.$background-color;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 5vh 0;

  &-collections {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;

    @include style.breakpoint(xs){
      width: 80%;
    }

    @include style.breakpoint(s){
      width: 70%;
    }

    @include style.breakpoint(m){
      width: 70%;
    }

    @include style.breakpoint(l){
      width: 60%;
    }

    @include style.breakpoint(xl){
      width: 50%;
    }

    @include style.breakpoint(xxl){
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