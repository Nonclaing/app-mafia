// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/device",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxt/eslint",
    ["@nuxt/fonts", {
      defaults: {
        weights: ["100 900"],
        styles: ["normal", "italic"],
        subsets: ["cyrillic-ext", "cyrillic", "latin-ext", "latin"],
      },
    }],
    ["@nuxt/icon", {
      mode: "css",
      cssLayer: "base",
    }],
    ["@nuxtjs/i18n", {
      locale: "ru",
      langDir: "locales/",
      strategy: "prefix_except_default",
      defaultLocale: "ru",
      fallbackLocale: "ru",
      locales: [
        { code: "ru", name: "Русский", iso: "ru-RU", file: "ru.json" },
      ],
    }],
    ["@pinia/nuxt", {
      storesDirs: ["./app/stores/**"],
    }],
    ["nuxt-headlessui", {
      prefix: "Hl",
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
  ssr: false,
  imports: {
    imports: [
      { from: "es-toolkit/compat", name: "get", as: "useGet" },
      { from: "es-toolkit/compat", name: "map", as: "useMap" },
      { from: "es-toolkit/compat", name: "find", as: "useFind" },
      { from: "es-toolkit/compat", name: "keys", as: "useKeys" },
      { from: "es-toolkit/compat", name: "merge", as: "useMerge" },
      { from: "es-toolkit/compat", name: "isEmpty" },
      { from: "es-toolkit/compat", name: "toString" },
    ],
  },
  devtools: { enabled: true },
  css: [
    "~/assets/css/tailwind.css",
  ],
  compatibilityDate: "2025-07-15",
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});
