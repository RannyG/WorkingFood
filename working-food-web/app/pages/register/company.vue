<script setup lang="ts">
definePageMeta({
  layout: false,
});

import * as yup from "yup";
import { getErrorMessages } from "~/core/helpers/error-tool";

const form = reactive({
  companyName: "",
  cnpj: "",
  password: ""
});

const errors = ref<Record<string, string>>({});

const schema = yup.object({
  companyName: yup.string().required("a Razão Social é obrigatória."),
  cnpj: yup.string().required("o CNPJ é obrigatório."),
  password: yup.string().required("a Senha é obrigatória.")
});

async function onSubmit() {
  try {
    await schema.validate(form, { abortEarly: false });
    errors.value = {};

    const config = useRuntimeConfig();

    await $fetch<string>(`${config.public.apiUrl}/restaurant`, {
      method: "POST",
      body: form,
    });

    navigateTo('/login');
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
      <h1 class="text-black text-3xl font-bold">Registrar Empresa</h1>

      <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
        <label class="label">
          Razão Social:
          <input class="input" v-model="form.companyName" />
        </label>
        <p v-if="errors.cpfCnpj" class="error">
          {{ errors.companyName }}
        </p>
        <label class="label">
          CNPJ:
          <input class="input" v-model="form.cnpj" />
        </label>
        <p v-if="errors.cpfCnpj" class="error">
          {{ errors.cnpj }}
        </p>

         <label class="label">
          Senha:
          <input class="input" type="password" v-model="form.password" />
        </label>
        <p v-if="errors.password" class="error">
          {{ errors.password }}
        </p>
        <button type="submit" class="button">Registrar</button>
        <div class="flex flex-col">
          <NuxtLink to="/login" class="link"
            >Já criou sua conta? Entrar</NuxtLink
          >
          <NuxtLink to="/register" class="link">Registrar-se</NuxtLink>
        </div>
      </form>
    </div>
  </main>
</template>
