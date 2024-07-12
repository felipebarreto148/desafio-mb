<script setup>
// Components
import MbSteps from '../Steps/MbSteps.vue';

defineProps({
  title: String
})
</script>

<template>
  <header class="mb-form-header">
    <mb-steps />
    <h1 class="mb-form-header__title">{{ title }}</h1>
  </header>
</template>

<style lang="scss">
.mb-form-header {
  display: flex;
  flex-direction: column;

  &__title {
    font: 700 26px sans-serif;
  }
}
</style>