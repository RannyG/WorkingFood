<script setup lang="ts">
import type { MealDto } from "~/core/models/interfaces/meals/meal.dto";

const config = useRuntimeConfig();

const meals = await $fetch<MealDto[]>(`${config.public.apiUrl}/product`, {
  method: "GET",
});
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold">Pratos</h1>
    <hr class="font-bold" />
  </div>

  <div class="flex flex-row my-8 mx-2 gap-4">
    <div
      class="flex flex-col gap-4 border border-yellow p-4 rounded-lg w-48 justify-between"
      v-for="meal in meals"
    >
      <h3 class="text-center font-bold text-xl">{{ meal.name }}</h3>
      <div class="flex flex-row justify-between">
        <p class="font-medium text-base">{{ meal.price }}</p>
        <button @click="navigateTo('/order')">
          <Icon name="mdi-light:cart" class="h-8 w-8" />
        </button>
      </div>
    </div>
  </div>
</template>
