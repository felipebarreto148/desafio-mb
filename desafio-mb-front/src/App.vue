<script setup>
// Core
import { reactive, ref, provide, computed } from 'vue';
// Services
import { makeRequests } from "@/services/makeRequests"
// Components
import WelcomeForm from './components/Forms/WelcomeForm.vue';
import PersonForm from './components/Forms/PersonForm.vue';
import AccessPasswordForm from './components/Forms/AccessPasswordForm.vue';
import ReviewInformationForm from './components/Forms/ReviewInformationForm.vue';

const globalState = reactive({
  form: {
    email: "",
    personType: "",

    name: "",
    cpf: "",
    birthday: "",
    cellphone: "",

    corporateReason: "",
    cnpj: "",
    openingDate: "",

    password: ""
  }
});
const currentStep = ref(1);
const steps = ref(4);
const isPhysicPerson = computed(() => globalState.form.personType === "Pessoa física");

provide("isPhysicPerson", isPhysicPerson);
provide("currentStep", currentStep);
provide("globalState", globalState);
provide("steps", steps);

function currentComponent() {
  switch (currentStep.value) {
    case 1: return WelcomeForm;
    case 2: return PersonForm;
    case 3: return AccessPasswordForm;
    case 4: return ReviewInformationForm;
  }
}
function next() {
  currentStep.value++;
}
function back() {
  currentStep.value--;
}
async function updateform(form) {
  await makeRequests().create("/registration", { body: { ...form } })
    .then(() => {
      next();
    });
}
</script>

<template>
  <main class="main-content">
    <transition name="fade" mode="out-in" appear>
      <component :is="currentComponent()" @next="next" @back="back" @submitForm="updateform" />
    </transition>
  </main>
</template>
