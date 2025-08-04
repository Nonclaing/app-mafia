// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,
  css: [
    "~/assets/css/tailwind.css",
  ],
  modules: [
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxt/eslint",
    ["@nuxt/icon", {
      mode: "css",
      cssLayer: "base",
    }],
    ["@nuxtjs/i18n", {
      defaultLocale: "ru",
    }],
    ["@pinia/nuxt",{
      storesDirs: ["./app/stores/**"],
    }],
    ["@vee-validate/nuxt", {
      autoImports: true,
      componentNames: {
        Form: "VeeForm",
        Field: "VeeField",
        FieldArray: "VeeFieldArray",
        ErrorMessage: "VeeErrorMessage",
      },
    }],
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  imports: {
    imports: [
      { from: "es-toolkit/compat", name: "get" },
      { from: "es-toolkit/compat", name: "map" },
      { from: "es-toolkit/compat", name: "find" },
      { from: "es-toolkit/compat", name: "keys" },
      { from: "es-toolkit/compat", name: "merge" },
      { from: "es-toolkit/compat", name: "isEmpty" },
      { from: "es-toolkit/compat", name: "toString" },
    ],
  },
});
