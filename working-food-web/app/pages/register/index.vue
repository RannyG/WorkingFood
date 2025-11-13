<script setup lang="ts">
definePageMeta({
  layout: false,
});

import * as yup from "yup";
import { getErrorMessages } from "~/core/helpers/error-tool";

const form = reactive({
  name: "",
  cpf: "",
  birthDate: "",
  cellphone: "",
  password: ""
});

const errors = ref<Record<string, string>>({});

const schema = yup.object({
  name: yup.string().required("o Nome é obrigatório."),
  cpf: yup.string().required("o CPF é obrigatório."),
  birthDate: yup.string().required("a Data de Nascimento é obrigatória."),
  cellphone: yup.string().required("o Telefone é obrigatório."),
  password: yup.string().required("a Senha é obrigatória."),
});

async function onSubmit() {
  try {
    await schema.validate(form, { abortEarly: false });
    errors.value = {};

    const config = useRuntimeConfig();

    await $fetch<string>(`${config.public.apiUrl}/costumer`, {
      method: "POST",
      body: form,
    });

    navigateTo('/login')
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      errors.value = getErrorMessages(err);
    }
  }
}
</script>
<template>
  <main class="h-full flex justify-center items-center">
    <div
      class="flex flex-col p-8 gap-8 border border-[#E8BA65] rounded-lg min-w-96"
    >
      <h1 class="text-black text-3xl font-bold">Registrar</h1>

      <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
        <label class="flex flex-col text-black text-base font-medium">
          Nome:
          <input
            class="border border-[#E8BA65] w-full rounded-sm"
            v-model="form.name"
          />
        </label>
        <p v-if="errors.cpfCnpj" class="error">
          {{ errors.name }}
        </p>
        <label class="flex flex-col text-black text-base font-medium">
          CPF:
          <input
            class="border border-[#E8BA65] w-full rounded-sm"
            v-model="form.cpf"
          />
        </label>
        <p v-if="errors.cpf" class="error">
          {{ errors.cpf }}
        </p>
        <label class="flex flex-col text-black text-base font-medium">
          Data de Nascimento:
          <input
            class="border border-[#E8BA65] w-full rounded-sm"
            v-model="form.birthDate"
          />
        </label>
        <p v-if="errors.birthDate" class="error">
          {{ errors.birthDate }}
        </p>
        <label class="flex flex-col text-black text-base font-medium">
          Telefone:
          <input
            class="border border-[#E8BA65] w-full rounded-sm"
            v-model="form.cellphone"
          />
        </label>
        <p v-if="errors.cellphone" class="error">
          {{ errors.cellphone }}
        </p>
        <label class="label">
          Senha:
          <input class="input" v-model="form.password" />
        </label>
        <p v-if="errors.password" class="error">
          {{ errors.password }}
        </p>
        <button type="submit" class="button">Registrar</button>
        <div class="flex flex-col">
          <NuxtLink to="/login" class="w-fit text-[#E8BA65] font-bold underline"
            >Já criou sua conta? Entrar</NuxtLink
          >
          <NuxtLink
            to="/register/company"
            class="w-fit text-[#E8BA65] font-bold underline"
            >Registrar como empresa</NuxtLink
          >
        </div>
      </form>
    </div>
  </main>
</template>
