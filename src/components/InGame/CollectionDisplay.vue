<template>
  <div class="collection-display">
    <transition-group name="collection-display">
      <location-card v-for="location in collection" :card="location" :key="location._id"
                     @location-guess="(value)=>{emit('locationGuess', value)}"/>
    </transition-group>
  </div>
</template>

<script>
export default {name: 'CollectionDisplay'}
</script>

<script setup>
import LocationCard from '@/components/InGame/LocationCard.vue';

const emit = defineEmits(['locationGuess']);
const props = defineProps({
  collection: {
    type: Array,
    required: true
  }
});
</script>

<style scoped lang="scss">
@use "@/assets/scss/style";

.collection-display {
  width: 65%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: .5rem;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}
</style>