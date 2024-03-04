<template>
  <div class="spy-footer">
    <div class="spy-footer-created">Made in Ukraine <img src="@/assets/img/ukraine.webp" alt="UA"></div>
    <div class="spy-footer-author"><a href="https://linktr.ee/f1anderz">f1anderz</a></div>
    <div class="spy-footer-copyright">
      &copy; <span class="highlight">2024</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpyFooter"
}
</script>

<script setup>

</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.spy-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  gap: 25%;
  background-color: style.$secondary-background-color;
  font-family: style.$font-body;
  color: style.$text-color;

  @include style.breakpoint(xs) {
    gap: 5%;
  }

  @include style.breakpoint(s) {
    gap: 20%;
  }

  @include style.breakpoint(m) {
    gap: 15%;
  }

  &-copyright {
    font-family: style.$font-header;
  }

  &-author a {
    color: style.$text-color;

    &:hover {
      color: style.$accent-color;
    }
  }

  &-created {
    display: flex;
    flex-direction: row;
    gap: .5rem;

    & img {
      display: block;
      margin-top: .3em;
      height: 1rem;
      width: 1rem;
    }
  }
}
</style>