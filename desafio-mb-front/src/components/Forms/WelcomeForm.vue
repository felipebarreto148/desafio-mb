<script setup>
// Core
import { inject, reactive, ref } from 'vue';
// Utils
import { hasEmptyFields, isValidEmail } from "@/utils/validate"
// Components
import MbForm from '../MB/Form/MbForm.vue';
import MbInput from '../MB/Input/MbInput.vue';
import MbRadio from '../MB/Radio/MbRadio.vue';
import MbButton from '../MB/Button/MbButton.vue';

// Emits
const emit = defineEmits(["next", "submitForm"]);
// State
const globalState = inject("globalState");

const errors = reactive({
  email_error: "",
  form_error: ""
})

const options = [
  { id: "firstOptions", label: "Pessoa física", value: "Pessoa física" },
  { id: "secondOptions", label: "Pessoa jurídica", value: "Pessoa jurídica" }
];

async function handleClick() {
  if(validateForm()) return;

  emit("submitForm", {
    email: globalState.form.email,
    personType: globalState.form.personType
  });
}

function validateForm() {
  resetErrors();
  const hasError = ref(false);
  if (!hasEmptyFields({
    email: globalState.form.email,
    personType: globalState.form.personType
  })) {
    errors.form_error = "Preencha todos os campos!"
    hasError.value = true;
  }
  if (!isValidEmail(globalState.form.email)) {
    errors.email_error = "Informe um email válido!";
    hasError.value = true;
  }

  return hasError.value;
}

function resetErrors () {
  errors.email_error = "";
  errors.form_error = "";
}
</script>

<template>
  <mb-form title="Seja bem vindo(a)">
    <mb-input 
      type="email" 
      label="Endereço de e-mail" 
      :error-message="errors.email_error" 
      v-model="globalState.form.email"
      name="email"
    />
    <mb-radio
      alignment="horizontal" 
      :options="options" 
      :error-message="errors.personType_error" 
      v-model="globalState.form.personType" 
    />
    <small class="error-message" v-if="errors.form_error">{{ errors.form_error }}</small>
    <mb-button @click="handleClick">Continuar</mb-button>
  </mb-form>
</template>
