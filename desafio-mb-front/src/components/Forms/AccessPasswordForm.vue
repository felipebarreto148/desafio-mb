<script setup>
// Core
import { inject, reactive, ref } from 'vue';
// Utils
import { hasEmptyFields } from "@/utils/validate";
// Components
import MbForm from '../MB/Form/MbForm.vue';
import MbInput from '../MB/Input/MbInput.vue';
import MbButton from '../MB/Button/MbButton.vue';

const emit = defineEmits(["next", "back", "submitForm"]);
// State
const globalState = inject("globalState");
const errors = reactive({
  password_error: ""
})

function handleSuccessClick() {
  if (formHasErrors()) return;
  emit("submitForm", { password: globalState.form.password });
}
function handleDeclineClick() {
  emit("back");
}

function formHasErrors() {
  const hasErrors = ref(false);

  if(!hasEmptyFields({
    password: globalState.form.password
  })) {
    if (!globalState.form.password) errors.password_error = "O campo é obrigatório!";
    hasErrors.value = true;
  }

  return hasErrors.value;
}
</script>

<template>
  <mb-form title="Senha de acesso">
    <mb-input 
      name="password"
      type="password"
      label="Sua senha"
      :error-message="errors.password_error"
      v-model="globalState.form.password"
    />
    <section class="inline-buttons">
      <mb-button variant="outlined" @click="handleDeclineClick">Voltar</mb-button>
      <mb-button @click="handleSuccessClick">Continuar</mb-button>
    </section>
  </mb-form>
</template>
