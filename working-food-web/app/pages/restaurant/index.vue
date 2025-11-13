<script setup lang="ts">
import type { MealDto } from "~/core/models/interfaces/meals/meal.dto";

const { user } = useAuth();

const config = useRuntimeConfig();

const token =
  typeof window !== "undefined" ? localStorage.getItem("AccessToken") : null;

const meals = await $fetch<MealDto[]>(
  `${config.public.apiUrl}/product/restaurant/${user?.value?.sub}`,
  {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  }
);
</script>

<template>
  <div class="flex flex-row justify-between">
    <h1 class="text-3xl font-bold">Produtos</h1>

    <button class="button px-2" @click="navigateTo('/restaurant/product/add')">
      Adicionar
    </button>
  </div>

  <div class="flex flex-row gap-4 mt-5 mx-2">
    <div
      class="flex flex-col gap-4 border border-yellow p-4 rounded-lg w-48 justify-between"
      v-for="meal in meals"
    >
      <h3 class="text-center font-bold text-xl">{{ meal.name }}</h3>
      <div class="flex flex-row justify-between">
        <p class="font-medium text-base">{{ meal.price }}</p>
        <div class="flex flex-row gap-2">
          <Icon name="mdi-light:delete" class="h-6 w-6 text-red-500" />
          <button @click="navigateTo(`/restaurant/product/edit/${meal.id}`)">
            <Icon name="mdi-light:pencil" class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
