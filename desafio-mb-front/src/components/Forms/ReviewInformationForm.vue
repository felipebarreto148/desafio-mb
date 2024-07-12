<script setup>
// Core
import { inject, onBeforeMount, reactive, computed, ref } from 'vue';
// Services
import { makeRequests } from '@/services/makeRequests';
// Utils
import { hasEmptyFields, isValidEmail, isValidCNPJ, isValidCPF, isValidDate } from "@/utils/validate"
// Components
import MbForm from '../MB/Form/MbForm.vue';
import MbInput from '../MB/Input/MbInput.vue';
import MbButton from '../MB/Button/MbButton.vue';

// Emits
const emit = defineEmits(["next", "back", "submitForm"]);
// State
const isPhysicPerson = inject("isPhysicPerson");
const state = reactive({
  form: {
    email: "",
    personType: "",
    name: "",
    cpf: "",
    birthday: "",
    corporateReason: "",
    cnpj: "",
    openingDate: "",
    cellphone: "",
    password: ""
  },
  errors: {
    email_error: "",
    personType_error: "",
    name_error: "",
    cpf_error: "",
    birthday_error: "",
    corporateReason_error: "",
    cnpj_error: "",
    openingDate_error: "",
    cellphone_error: "",
    password_error: ""
  }
});

const today = computed(() => new Date().toISOString().split('T')[0]);
const form = computed(() => {
  if (isPhysicPerson.value) { 
    return {
      email: state.form.email,
      personType: state.form.personType,
      name: state.form.name,
      cpf: state.form.cpf,
      birthday: state.form.birthday,
      cellphone: state.form.cellphone,
      password: state.form.password,
    }
  } else {
    return {
      email: state.form.email,
      personType: state.form.personType,
      corporateReason: state.form.corporateReason,
      cnpj: state.form.cnpj,
      openingDate: state.form.openingDate,
      cellphone: state.form.cellphone,
      password: state.form.password
    }
  }
})

function handleSuccessClick() {
  if (formHasErrors()) return;
  emit("submitForm", state.form);
}
function handleDeclineClick() {
  emit("back");
}
async function fetchFields() {
  await makeRequests().read("/registration")
    .then((res) => {
      const { fields } = res;
      state.form = { ...fields }
    })
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

  if (!isValidEmail(state.form.email)) {
    state.errors.email_error = "Informe um email válido!";
  }

  if (!isValidCPF(state.form.cpf)) {
    state.errors.cpf_error = "Informe um CPF válido!";
    hasError.value = true;
  }
  if (!isValidDate(state.form.birthday, today.value)) {
    state.errors.birthday_error = "Data inválida!";
    hasError.value = true;
  }
  if (!hasEmptyFields({ ...form.value })) {
    if (!state.form.email) state.errors.email_error = "O campo é obrigatório!";
    if (!state.form.name) state.errors.name_error = "O campo é obrigatório!";
    if (!state.form.cpf) state.errors.cpf_error = "O campo é obrigatório!";
    if (!state.form.birthday) state.errors.birthday_error = "O campo é obrigatório!";
    if (!state.form.cellphone) state.errors.cellphone_error = "O campo é obrigatório!";
    if (!state.form.password) state.errors.password_error = "O campo é obrigatório!";

    hasError.value = true;
  }
  
  return hasError.value;
}
function validateLegalPersonForm() {
  const hasError = ref(false);

  if (!isValidEmail(state.form.email)) {
    state.errors.email_error = "Informe um email válido!";
  }

  if (!isValidCNPJ(state.form.cnpj)) {
    state.errors.cnpj_error = "Informe um CNPJ válido!";
    hasError.value = true;
  }
  if (!isValidDate(state.form.openingDate, today.value)) {
    state.errors.openingDate_error = "Data inválida!";
    hasError.value = true;
  }
  if (!hasEmptyFields({ ...form.value })) {
    if (!state.form.corporateReason) state.errors.corporateReason_error = "O campo é obrigatório!";
    if (!state.form.cnpj) state.errors.cnpj_error = "O campo é obrigatório!";
    if (!state.form.openingDate) state.errors.openingDate_error = "O campo é obrigatório!";
    if (!state.form.cellphone) state.errors.cellphone_error = "O campo é obrigatório!";

    hasError.value = true;
  }

  return hasError.value;
}

function resetErrors() {
  state.errors.email_error = "";
  state.errors.personType_error = "";
  state.errors.name_error = "";
  state.errors.cpf_error = "";
  state.errors.birthday_error = "";
  state.errors.corporateReason_error = "";
  state.errors.cnpj_error = "";
  state.errors.openingDate_error = "";
  state.errors.cellphone_error = "";
  state.errors.password_error = "";
}

onBeforeMount(async () => {
  await fetchFields();
})
</script>

<template>
  <mb-form title="Revise suas informações">
    <mb-input 
      type="email"
      name="email"
      label="Endereço de e-mail"
      v-model="state.form.email"
      :error-message="state.errors.email_error"
    />
    <!-- Form Pessoa Física -->
    <template v-if="isPhysicPerson">
      <mb-input 
        label="Nome"
        name="name"
        v-model="state.form.name"
        :error-message="state.errors.name_error"
      />
      <mb-input 
        label="CPF"
        name="cpf"
        mask="###.###.###-##"
        v-model="state.form.cpf"
        :error-message="state.errors.cpf_error"
      />
      <mb-input 
        type="date"
        :max-date="today"
        name="birthday"
        label="Data de nascimento"
        v-model="state.form.birthday"
        :error-message="state.errors.birthday_error"
      />
    </template>
    <!-- Form Pessoa Jurídica -->
    <template v-else>
      <mb-input 
        label="Razão social"
        name="corporateReason"
        v-model="state.form.corporateReason"
        :error-message="state.errors.corporateReason_error"
      />
      <mb-input 
        label="CNPJ"
        name="cnpj"
        mask="##.###.###/####-##"
        v-model="state.form.cnpj"
        :error-message="state.errors.cnpj_error"
      />
      <mb-input 
        type="date"
        :max-date="today"
        name="openingDate"
        label="Data de abertura"
        v-model="state.form.openingDate"
        :error-message="state.errors.openingDate_error"
      />
    </template>
    <mb-input 
      label="Telefone"
      name="cellphone"
      v-model="state.form.cellphone"
      mask="['(##) ####-####', '(##) #####-####']"
      :error-message="state.errors.cellphone_error"
    />
    <mb-input 
      type="password"
      name="password"
      label="Sua senha"
      v-model="state.form.password"
      :error-message="state.errors.password_error"
    />
    <section class="inline-buttons">
      <mb-button variant="outlined" @click="handleDeclineClick">Voltar</mb-button>
      <mb-button @click="handleSuccessClick">Cadastrar</mb-button>
    </section>
  </mb-form>
</template>
