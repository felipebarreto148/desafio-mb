<script setup>
// Core
import { vMaska } from 'maska/vue'

const emit = defineEmits(["update:modelValue"]);

defineProps({
  name: {
    type: String,
    required: true,
    default: ""
  },
  modelValue: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "text"
  },
  label: {
    type: String,
    default: "text"
  },
  mask: {
    type: String,
    default: ""
  },
  errorMessage: {
    type: String,
    default: ""
  },
  maxDate: {
    type: String,
    default: ""
  }
})

function handleInput(event) {
  emit("update:modelValue", event.target.value)
}
</script>

<template>
  <section class="mb-input">
    <label :for="name">{{ label }}</label>
    <section class="mb-input__field">
      <input :name="name" :value="modelValue" :max="maxDate" :type="type" v-maska :data-maska="mask" @input="handleInput" />
    </section>
    <small class="error-message">{{ errorMessage }}</small>
  </section>
</template>

<style lang="scss">
.mb-input {
  min-width: 250px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;

  &__field {
    border: 1px solid black;
    border-radius: 8px;
    padding: 8px;
  }

  input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 14px;
  }
}
</style>