<script setup lang="ts">
definePageMeta({
  layout: false,
});

import * as yup from "yup";
import { getErrorMessages } from "~/core/helpers/error-tool";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "~/core/models/interfaces/jwt-payload";
import { ERole } from "~/core/models/enums/role.enum";
import { useAuth } from "~/composables/use-auth";

const form = reactive({
  cpfCnpj: "",
  password: "",
});

const errors = ref<Record<string, string>>({});

const { setUser } = useAuth();

const schema = yup.object({
  cpfCnpj: yup.string().required("o CPF/CNPJ é obrigatório."),
  password: yup.string().required("a Senha é obrigatória."),
});

async function onSubmit() {
  try {
    await schema.validate(form, { abortEarly: false });
    errors.value = {};
    const config = useRuntimeConfig();

    const token = await $fetch<string>(`${config.public.apiUrl}/auth/login`, {
      method: "POST",
      body: form,
    });

    localStorage.setItem("AccessToken", token);
    const decodedToken = jwtDecode<JwtPayload>(token);

    setUser(decodedToken);

    if (decodedToken.role === ERole.COSTUMER) {
      await navigateTo("/");
    } else {
      await navigateTo("/restaurant");
    }
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      errors.value = getErrorMessages(err);
    }
    console.log(err);
  }
}
</script>

<template>
  <main class="h-full flex justify-center items-center">
    <div
      class="flex flex-col p-8 gap-8 border border-[#E8BA65] rounded-lg min-w-96"
    >
      <h1 class="text-black text-3xl font-bold">Entrar</h1>

      <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
        <label class="label" name="cpfCnpj">
          CPF/CNPJ:
          <input class="input" v-model="form.cpfCnpj" />
        </label>
        <p v-if="errors.cpfCnpj" class="error">
          {{ errors.cpfCnpj }}
        </p>
        <label class="label">
          Senha:
          <input class="input" v-model="form.password" type="password" />
        </label>
        <p v-if="errors.password" class="error">
          {{ errors.password }}
        </p>
        <button type="submit" class="button">Entrar</button>

        <NuxtLink to="/register" class="link">Cadastrar-se</NuxtLink>
      </form>
    </div>
  </main>
</template>
