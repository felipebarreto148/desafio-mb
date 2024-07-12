<script setup>
// Core
import { inject, computed, reactive, ref } from 'vue';
// Utils
import { hasEmptyFields, isValidCPF, isValidCNPJ, isValidDate } from "@/utils/validate"
// Components
import MbForm from '../MB/Form/MbForm.vue';
import MbInput from '../MB/Input/MbInput.vue';
import MbButton from '../MB/Button/MbButton.vue';

// emits
const emit = defineEmits(["next", "back", "submitForm"]);
// State
const isPhysicPerson = inject("isPhysicPerson");
const globalState = inject("globalState");

const errors = reactive({
  name_error: "",
  cpf_error: "",
  birthday_error: "",
  cellphone_error: "",
  corporateReason_error: "",
  cnpj_error: "",
  openingDate_error: ""
})

// Getters
const physicPersonForm = computed(() => {
  return {
    name: globalState.form.name,
    cpf: globalState.form.cpf,
    birthday: globalState.form.birthday,
    cellphone: globalState.form.cellphone,
  }
});
const legalPersonForm = computed(() => {
  return {
    corporateReason: globalState.form.corporateReason,
    cnpj: globalState.form.cnpj,
    openingDate: globalState.form.openingDate,
    cellphone: globalState.form.cellphone,
  }
});
const form = computed(() => isPhysicPerson.value ? physicPersonForm.value : legalPersonForm.value);
const today = computed(() => new Date().toISOString().split('T')[0]);

function handleSuccessClick() {
  if(formHasErrors()) return;
  emit("submitForm", { ...form.value });
}
function handleDeclineClick() {
  emit("back");
}

function formHasErrors() {
  resetErrors();

  if (isPhysicPerson.value) {
    return validatePhysicPersonForm();
  } else {
    return validateLegalPersonForm();
  } 
}
function validatePhysicPersonForm() {
  const hasError = ref(false);

  if (!isValidCPF(globalState.form.cpf)) {
    errors.cpf_error = "Informe um CPF válido!";
    hasError.value = true;
  }
  if (!isValidDate(globalState.form.birthday, today.value)) {
    errors.birthday_error = "Data inválida!";
    hasError.value = true;
  }
  if (!hasEmptyFields({ ...form.value })) {
    if (!globalState.form.name) errors.name_error = "O campo é obrigatório!";
    if (!globalState.form.cpf) errors.cpf_error = "O campo é obrigatório!";
    if (!globalState.form.birthday) errors.birthday_error = "O campo é obrigatório!";
    if (!globalState.form.cellphone) errors.cellphone_error = "O campo é obrigatório!";

    hasError.value = true;
  }
  
  return hasError.value;
}
function validateLegalPersonForm() {
  const hasError = ref(false);

  if (!isValidCNPJ(globalState.form.cnpj)) {
    errors.cnpj_error = "Informe um CNPJ válido!";
    hasError.value = true;
  }
  if (!isValidDate(globalState.form.openingDate, today.value)) {
    errors.openingDate_error = "Data inválida!";
    hasError.value = true;
  }
  if (!hasEmptyFields({ ...form.value })) {
    if (!globalState.form.corporateReason) errors.corporateReason_error = "O campo é obrigatório!";
    if (!globalState.form.cnpj) errors.cnpj_error = "O campo é obrigatório!";
    if (!globalState.form.openingDate) errors.openingDate_error = "O campo é obrigatório!";
    if (!globalState.form.cellphone) errors.cellphone_error = "O campo é obrigatório!";

    hasError.value = true;
  }

  return hasError.value;
}
function resetErrors() {
  errors.name_error = "";
  errors.cpf_error = "";
  errors.birthday_error = "";
  errors.cellphone_error = "";
  errors.corporateReason_error = "";
  errors.cnpj_error = "";
  errors.openingDate_error = "";
}
</script>

<template>
  <mb-form :title="isPhysicPerson ? 'Pessoa Física' : 'Pessoa Jurídica'">
    <!-- Form Pessoa Física -->
    <template v-if="isPhysicPerson">
      <mb-input 
        label="Nome"
        :error-message="errors.name_error"
        v-model="globalState.form.name"
        name="name"
      />
      <mb-input 
        label="CPF"
        mask="###.###.###-##"
        :error-message="errors.cpf_error"
        v-model="globalState.form.cpf"
        name="cpf"
      />
      <mb-input 
        type="date"
        :max-date="today"
        label="Data de nascimento"
        :error-message="errors.birthday_error"
        v-model="globalState.form.birthday"
        name="birthday"
      />
    </template>
    <!-- Form Pessoa Jurídica -->
    <template v-else>
      <mb-input 
        label="Razão social"
        :error-message="errors.corporateReason_error"
        v-model="globalState.form.corporateReason"
        name="corporateReason"
      />
      <mb-input 
        label="CNPJ"
        mask="##.###.###/####-##"
        :error-message="errors.cnpj_error"
        v-model="globalState.form.cnpj"
        name="cnpj"
      />
      <mb-input 
        type="date"
        :max-date="today"
        label="Data de abertura"
        :error-message="errors.openingDate_error"
        v-model="globalState.form.openingDate"
        name="openingDate"
      />
    </template>
    <mb-input 
      label="Telefone"
      mask="['(##) ####-####', '(##) #####-####']"
      :error-message="errors.cellphone_error"
      v-model="globalState.form.cellphone"
      name="cellphone"
    />
    <section class="inline-buttons">
      <mb-button variant="outlined" @click="handleDeclineClick">Voltar</mb-button>
      <mb-button @click="handleSuccessClick">Continuar</mb-button>
    </section>
  </mb-form>
</template>
