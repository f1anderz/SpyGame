<template>
  <div class="list-locations">
    <transition-group name="list-locations">
      <location v-for="location in locations" :location="location" :key="location._id"/>
    </transition-group>
  </div>
</template>

<script>
export default {name: 'ListLocations'}
</script>

<script setup>
import Location from '@/components/LocationWorkshop/Location.vue';

const props = defineProps({
  locations: Array
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.list-locations {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: .1rem;
  padding-left: .5rem;
}
</style>