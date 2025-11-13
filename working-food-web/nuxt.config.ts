import tailwindcss from "@tailwindcss/vite";
import process from "process";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URI,
    },
  },
  icon: {
    mode: "css",
    cssLayer: "base",
  },

  modules: ["@nuxt/icon"],
});
