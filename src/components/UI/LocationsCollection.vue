<template>
  <div class="locations-collection">
    <div class="locations-collection-name" @click="showList = !showList">{{ props.collection.name }}</div>
    <div class="locations-collection-locations">
      <list-locations :locations="props.collection.locations" v-if="showList"/>
    </div>
  </div>
</template>

<script>
export default {name: 'LocationsCollection'}
</script>

<script setup>
import ListLocations from '@/components/UI/ListLocations.vue';
import {ref} from 'vue';

const props = defineProps({
  collection: Object
});

const showList = ref(false);
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.locations-collection {
  display: flex;
  flex-direction: column;
  gap: .2rem;

  &-name {
    font-family: style.$font-body;
    color: style.$text-color;

    @include style.breakpoint(xxl) {
      &:hover {
        color: style.$accent-color;
        cursor: pointer;
      }
    }
  }
}
</style>