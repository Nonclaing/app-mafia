// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "pathe";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: [
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
      vueI18n: resolve("./i18n.config.ts"),
    }],
    ["@pinia/nuxt", {
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
