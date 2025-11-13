<template>
  <div class="flex justify-between items-center mt-12">
    <div class="flex flex-col gap-8 w-1/2">
      <h1 class="text-4xl font-bold leading-normal">
        Nós te servimos, essa é a prova de que te amamos!
      </h1>

      <p class="text-sm font-medium w-3/4 leading-normal">
        Este é um lugar diferente de todos os outros. Aqui, nós reunimos
        vários dos melhores restaurantes para um único objetivo: servir a você.
        Já sentiu aquela sensação de não saber onde escolher o seu prato? Clique
        em Explorar e veja mais.
      </p>

      <div>
        <button class="button px-2" @click="navigateTo('/menu')">
          Ir para menu
        </button>
      </div>
    </div>

    <div class="flex w-1/2 justify-end">
      <img src="~/assets/images/beautiful-meal.png" alt="Beautiful Meal" />
    </div>
  </div>
</template>
