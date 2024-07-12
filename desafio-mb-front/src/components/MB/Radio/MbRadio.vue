<script setup>
const emit = defineEmits(["update:modelValue"]);

defineProps({
  alignment: {
    type: String,
    default: "vertical",
    required: false
  },
  modelValue: {
    type: String,
    default: "",
    required: true
  },
  errorMessage: {
    type: String,
    default: "",
  },
  options: [Array, Object]
})

function handleChange({ value }) {
  emit("update:modelValue", value);
}
</script>

<template>
  <section class="mb-radios" :class="[alignment]">
    <section class="mb-radio" v-for="(opt, index) in options" :key="index">
      <input type="radio" :id="opt.id" :value="opt.value" :checked="modelValue === opt.value"
        @change="() => handleChange(opt)">
      <label :for="opt.id">{{ opt.label }}</label>
    </section>
  </section>
</template>

<style lang="scss">
.mb-radios {
  display: flex;
  gap: 5px;

  &.vertical {
    flex-direction: column;
  }

  &.horizontal {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 25px;
  }


  .mb-radio {
    display: flex;
    align-items: center;
    gap: 5px;
  }
}
</style>
