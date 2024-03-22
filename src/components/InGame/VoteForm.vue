<template>
  <div class="vote-form">
    <div class="vote-form-title">Kick {{ props.suspect }}?</div>
    <div class="vote-form-controls">
      <div class="vote-form-controls-button" :class="{disabled: props.voted}">No</div>
      <div class="vote-form-controls-button" :class="{disabled: props.voted}">Yes</div>
    </div>
  </div>
</template>

<script>
export default {name: 'VoteForm'}
</script>

<script setup>
const props = defineProps({
  suspect: {
    type: String,
    required: true
  },
  voted: {
    type: Boolean,
    required: true
  }
});
</script>

<style scoped lang="scss">
@use "@/assets/scss/style";

.vote-form {

}
</style>