<script setup lang="ts">
import { useAuth } from "~/composables/use-auth";

const { user, logout } = useAuth();
</script>

<template>
  <header class="flex flex-row px-16 py-8 justify-between">
    <NuxtLink class="flex flex-row gap-2 items-center" to="/">
      <img src="~/assets/images/logo.png" alt="Logo" class="h-12 w-12" />
      <h1 class="text-[#4A291E] text-xl font-bold">WorkingFood</h1>
    </NuxtLink>
    <ul class="flex flex-row gap-8 items-center">
      <li>
        <NuxtLink to="/menu" class="text-[#4A291E] text-lg font-medium"
          >Menu</NuxtLink
        >
      </li>
      <li>
        <NuxtLink to="/contact" class="text-[#4A291E] text-lg font-medium"
          >Contato</NuxtLink
        >
      </li>
      <li v-if="user === null">
        <button
          @click="navigateTo('/login')"
          to="/login"
          class="text-[#4A291E] text-lg font-medium bg-[#F3BC58] py-4 px-8 rounded-lg cursor-pointer"
        >
          Entrar
        </button>
      </li>

      <li v-if="user !== null">
        <button
          class="text-[#4A291E] text-lg font-medium bg-[#F3BC58] py-4 px-8 rounded-lg cursor-pointer"
          @click="logout"
        >
          Sair
        </button>
      </li>
    </ul>
  </header>
</template>
