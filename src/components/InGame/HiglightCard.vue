<template>
  <div class="highlight-card">
    <div class="highlight-card-name">{{ props.card.name }}</div>
    <img :src="images[props.card.image]" :alt="props.card.name">
  </div>
</template>

<script>
export default {name: 'HighlightCard'}
</script>

<script setup>
import {onMounted} from 'vue';
import {filename} from 'pathe/utils'

const props = defineProps({
  card: {
    type: Object,
    required: true
  }
});

const images = Object.fromEntries(
    Object.entries(import.meta.glob('@/assets/img/locations/*.webp',
        {eager: true})).map(([key, value]) => [filename(key), value.default]));

onMounted(() => {
});
</script>

<style scoped lang="scss">
@use "@/assets/scss/style";

.highlight-card {
  position: relative;

  &-name {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: style.$text-color;
    font-size: 1.2rem;
    font-family: style.$font-header;
    background: rgba(0, 0, 0, .3);
    border: .15rem solid style.$accent-color;
    border-radius: 1rem;
  }

  & img {
    height: 10rem;
    width: 10rem;
    display: block;
    border-radius: 1rem;
  }
}
</style>