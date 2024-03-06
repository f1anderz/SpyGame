<template>
  <div class="list-locations-collections">
    <transition-group name="collections-list">
      <locations-collection v-for="collection in props.collections" :collection="collection" :key="collection._id"/>
    </transition-group>
  </div>
</template>

<script>
export default {name: 'ListLocationsCollections'}
</script>

<script setup>
import LocationsCollection from '@/components/UI/LocationsCollection.vue';

const props = defineProps({
  collections: Array
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.list-locations-collections {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: .5rem;
}
</style>