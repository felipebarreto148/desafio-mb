<script setup>
// Core
import { inject } from 'vue';

defineProps({
  total: Number,
  current: Number
})

const steps = inject("steps");
const currentStep = inject("currentStep");
</script>

<template>
  <p class="mb-steps">Etapa <span class="current">{{ current || currentStep }}</span> de {{ total || steps }}</p>
</template>

<style lang="scss">
.mb-steps {
  font: 500 12px "Poppins", sans-serif;

  .current {
    color: var(--primary-color);
  }
}
</style>