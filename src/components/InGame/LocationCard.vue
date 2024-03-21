<template>
  <div class="location-card" @click="locationClick">
    <div class="location-card-overlay" v-if="clicked">
      <div class="location-card-overlay-guess" v-if="store.state.user._id === store.state.game.spy">Guess</div>
    </div>
    <div class="location-card-name">{{ props.card.name }}</div>
    <img :src="images[props.card.image]" :alt="props.card.name">
  </div>
</template>

<script>
export default {name: 'LocationCard'}
</script>

<script setup>
import {filename} from 'pathe/utils';
import {useStore} from 'vuex';
import {ref} from 'vue';

const store = useStore();
const emit = defineEmits(['locationGuess']);
const props = defineProps({
  card: {
    type: Object,
    required: true
  }
});

const clicked = ref(false);
const images = Object.fromEntries(
    Object.entries(import.meta.glob('@/assets/img/locations/*.webp',
        {eager: true})).map(([key, value]) => [filename(key), value.default]));

function locationClick(event) {
  if (event.target.classList[0] === 'location-card-name') {
    clicked.value = !clicked.value
  } else {
    emit('locationGuess', props.card._id)
  }
}
</script>

<style scoped lang="scss">
@use "@/assets/scss/style";

.location-card {
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
    font-family: style.$font-header;
    background: rgba(0, 0, 0, .3);
    border: .15rem solid style.$secondary-background-color;
    border-radius: .5rem;

    @include style.breakpoint(xxl) {
      &:hover {
        border: .15rem solid style.$accent-color;
        cursor: pointer;
      }
    }
  }

  &-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: rgba(150, 150, 150, .7);
    border-radius: .5rem;

    &-guess {
      z-index: 2;
      top: 70%;
      position: absolute;
      color: style.$text-color;
      font-family: style.$font-body;
      background: style.$accent-color;
      padding: .1rem .5rem .2rem;
      border-radius: 5rem;

      @include style.breakpoint(xxl) {
        &:hover {
          cursor: grab;
        }
      }
    }
  }

  & img {
    height: 8rem;
    width: 8rem;
    display: block;
    border-radius: .5rem;
  }
}
</style>