<script setup lang="ts">
import * as yup from "yup";
import { getErrorMessages } from "~/core/helpers/error-tool";

import { useRouter } from "vue-router";
import type { MealDto } from "~/core/models/interfaces/meals/meal.dto";

const availableSelectOptions: { label: string; value: boolean | null }[] = [
  { label: "Selecione", value: null },
  { label: "Sim", value: true },
  { label: "Não", value: false },
];

const router = useRouter();

const route = useRoute();

const config = useRuntimeConfig();

const id = computed(() => route.params.id);

const token =
  typeof window !== "undefined" ? localStorage.getItem("AccessToken") : null;

const { data } = await useFetch<MealDto>(
  config.public.apiUrl + `/product/${id.value}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

const goBack = () => {
  router.back();
};

const form = reactive({
  name: data.value?.name,
  description: data.value?.description,
  price: data.value?.price,
  isAvailable: data.value?.isAvailable,
});

const errors = ref<Record<string, string>>({});

const schema = yup.object({
  name: yup.string().required("o Nome é obrigatório."),
  description: yup.string().nullable(),
  price: yup.number().required("o Preço é obrigatório."),
  isAvailable: yup.bool().required("Selecione uma disponibilidade."),
});

async function onSubmit() {
  try {
    await schema.validate(form, { abortEarly: false });
    errors.value = {};
    await $fetch(config.public.apiUrl + `/product/${id.value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: {
        name: form.name,
        description: form.description,
        price: form.price,
        isAvailable: form.isAvailable,
      },
    });

    goBack();
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      errors.value = getErrorMessages(err);
    }
  }
}
</script>

<template>
  <h2 class="font-bold text-3xl">Editar Produto</h2>
  <hr />

  <form class="flex flex-col gap-4 mt-5" @submit.prevent="onSubmit">
    <div>
      <label class="label">
        Nome
        <input class="input" v-model="form.name" />
      </label>
      <p v-if="errors.name" class="error">
        {{ errors.name }}
      </p>
    </div>

    <div>
      <label class="label">
        Descrição
        <textarea class="input" v-model="form.description" />
      </label>
      <p v-if="errors.description" class="error">
        {{ errors.description }}
      </p>
    </div>

    <div>
      <label class="label">
        Preço
        <input class="input" v-model="form.price" />
      </label>
      <p v-if="errors.price" class="error">
        {{ errors.price }}
      </p>
    </div>

    <div>
      <label class="label">
        Está disponível?
        <select class="input" v-model="form.isAvailable">
          <option
            v-for="option in availableSelectOptions"
            :value="option.value"
            :selected="option.value === null"
            :disabled="option.value === null"
          >
            {{ option.label }}
          </option>
        </select>
      </label>
      <p v-if="errors.isAvailable" class="error">
        {{ errors.isAvailable }}
      </p>
    </div>
    <button type="submit" class="button">Salvar</button>
    <button
      type="button"
      class="button bg-transparent! border border-yellow"
      @click="goBack"
    >
      Cancelar
    </button>
  </form>
</template>
