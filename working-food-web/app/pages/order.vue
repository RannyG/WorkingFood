<script setup lang="ts">
import type { AddressDto } from "~/core/models/interfaces/address/address.dto";

const form = reactive({
  cep: "",
  streetName: "",
  complement: "",
  neighborhood: "",
  state: "",
});

const config = useRuntimeConfig();

async function searchOpenViaCepApi() {
  const response = await $fetch<AddressDto>(
    `${config.public.apiUrl}/address/${form.cep}`
  );

  form.streetName = response.streetName;
  form.complement = response.complement ?? "";
  form.neighborhood = response.neighborhood ?? "";
  form.state = response.state;
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold">Finalizar pedido</h1>
    <hr class="font-bold" />
  </div>

  <div class="flex flex-col mt-5 gap-4">
    <div class="flex flex-row gap-4">
      <label class="label w-full">
        CEP
        <input class="input" v-model="form.cep" />
      </label>
      <button class="button px-2" @click="searchOpenViaCepApi">
        Pesquisar
      </button>
    </div>

    <label class="label w-full">
      Logradouro
      <input class="input" disabled v-model="form.streetName" />
    </label>

    <label class="label w-full">
      Complemento
      <input class="input" disabled v-model="form.complement" />
    </label>

    <label class="label w-full">
      Bairro
      <input class="input" disabled v-model="form.neighborhood" />
    </label>

    <label class="label w-full">
      Estado
      <input class="input" disabled v-model="form.state" />
    </label>
  </div>
</template>
