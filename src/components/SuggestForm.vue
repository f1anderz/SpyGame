<template>
  <div class="suggest-page">
    <div class="suggest-page-form">
      <div class="suggest-page-form-header">Suggest new content</div>
      <div class="suggest-page-form-location" v-if="props.formMode === 'L'">
        <spy-input :spy-placeholder="'Location name...'" @dataInput="(value)=>{locationName = value}"/>
      </div>
      <div class="suggest-page-form-collection" v-else-if="props.formMode === 'C'">
        <spy-input :spy-placeholder="'Collection name...'" @dataInput="(value)=>{collectionName = value}"/>
        <spy-dropdown :dropdown-options="collectionLocations" @option-select="optionSelected"/>
      </div>
      <adaptive-button :adapt-value="['Suggest Location','Suggest Collection']" :adapt-property="formMode === 'L'"
                       @adaptive-click="makeSuggestion"/>
    </div>
  </div>
</template>

<script>
export default {name: 'SuggestForm'}
</script>

<script setup>
import SpyInput from '@/components/UI/SpyInput.vue';
import {onMounted, ref} from 'vue';
import AdaptiveButton from '@/components/UI/AdaptiveButton.vue';
import api from '@/api/locations.js';
import SpyDropdown from '@/components/UI/SpySelectList.vue';

const emit = defineEmits([
  'suggestion'
]);

const props = defineProps({
  formMode: String
});

const locationName = ref('');
const collectionName = ref('');
const collectionLocations = ref({});

function makeSuggestion() {
  if (props.formMode === 'L') {
    api.postLocation(locationName.value);
  } else if (props.formMode === 'C') {
    let locations = collectionLocations.value.list.filter((item) => {
      return item.selected === true;
    });
    api.postCollection({
      name: collectionName.value, locations: locations
    });
  }
  emit('suggestion');
}

function optionSelected(value) {
  collectionLocations.value.list.forEach((item) => {
    if (item._id === value._id) {
      item.selected = !item.selected;
    }
  });
}

onMounted(() => {
  if (props.formMode === 'C') {
    api.getLocations().then((result) => {
      collectionLocations.value.list = result.data.locations;
      collectionLocations.value.header = 'Locations';
      collectionLocations.value.list.forEach((item) => {
        item.selected = false;
      });
    }).catch((err) => {
      console.log(err);
    });
  }
});
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

    @include style.breakpoint(xs) {
      width: 80%;
    }

    @include style.breakpoint(s) {
      width: 50%;
    }

    @include style.breakpoint(m) {
      width: 45%;
    }

    @include style.breakpoint(l) {
      width: 35%;
    }

    @include style.breakpoint(xl) {
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

    &-collection {
      display: flex;
      flex-direction: column;
      gap: .5rem;
    }
  }
}
</style>