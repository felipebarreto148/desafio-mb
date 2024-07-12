<script setup>
defineProps({
  variant: {
    type: String,
    default: "filled",
    required: false
  },
  label: {
    type: String,
    default: "Clique aqui!",
    required: false
  },
})
</script>

<template>
  <button class="mb-button" :class="[variant]">
    <slot>
      {{ label }}
    </slot>
  </button>
</template>

<style lang="scss" scoped>
.mb-button {
  outline: none;
  min-height: 50px;
  width: 100%;
  padding: 10px 0;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all ease-in-out 200ms;
  font: 500 16px sans-serif;

  &.filled {
    color: white;
    background: var(--primary-color);
  }

  &.outlined {
    background: transparent;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
  }

  &:hover {
    transform: scale3d(0.9, 0.9, 0.9);
  }
}
</style>