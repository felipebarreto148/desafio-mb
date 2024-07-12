<script setup>
// Components
import MbCustomHeader from '../CustomHeader/MbCustomHeader.vue';

defineProps({
  title: String
})
</script>

<template>
  <section class="mb-form">
    <mb-custom-header :title="title" />
    <slot />
  </section>
</template>

<style lang="scss">
.mb-form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
  width: 100%;
  max-width: 350px;
}
</style>