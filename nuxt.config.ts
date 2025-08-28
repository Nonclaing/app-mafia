// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

const NUXT_API_BASE_URL = process.env.NUXT_API_BASE_URL || "http://localhost:3000";

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/device",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxt/eslint",
    "@nuxt/test-utils/module",
    ["nuxt-schema-org", {
      canonicalHost: "http://localhost:3000",
    }],
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
  ssr: true,
  imports: {
    imports: [
      { from: "es-toolkit/compat", name: "get", as: "useGet" },
      { from: "es-toolkit/compat", name: "map", as: "useMap" },
      { from: "es-toolkit/compat", name: "find", as: "useFind" },
      { from: "es-toolkit/compat", name: "keys", as: "useKeys" },
      { from: "es-toolkit/compat", name: "keyBy", as: "useKeyBy" },
      { from: "es-toolkit/compat", name: "merge", as: "useMerge" },
      { from: "es-toolkit/compat", name: "uniqueId", as: "useUniqueId" },
      { from: "es-toolkit/compat", name: "join", as: "useJoin" },
      { from: "es-toolkit/compat", name: "mapValues", as: "useMapValues" },
      { from: "es-toolkit/compat", name: "filter", as: "useFilter" },
      { from: "es-toolkit/compat", name: "castArray", as: "useCastArray" },
      { from: "es-toolkit/compat", name: "reject", as: "useReject" },
      { from: "es-toolkit/compat", name: "split", as: "useSplit" },
      { from: "es-toolkit/compat", name: "size", as: "useSize" },
      { from: "es-toolkit/compat", name: "chunk", as: "useChunk" },
      { from: "es-toolkit/compat", name: "forEach", as: "useForEach" },
      { from: "es-toolkit/compat", name: "sortBy", as: "useSortBy" },
      { from: "es-toolkit/compat", name: "groupBy", as: "useGroupBy" },
      { from: "es-toolkit/compat", name: "range", as: "useRange" },
      { from: "es-toolkit/compat", name: "findIndex", as: "useFindIndex" },
      { from: "es-toolkit/compat", name: "remove", as: "useRemove" },
      { from: "es-toolkit/compat", name: "max", as: "useMax" },
      { from: "es-toolkit/compat", name: "pick", as: "usePick" },
      { from: "es-toolkit/compat", name: "omit", as: "useOmit" },
      { from: "es-toolkit/compat", name: "values", as: "useValues" },
      { from: "es-toolkit/compat", name: "throttle", as: "useThrottle" },
      { from: "es-toolkit/compat", name: "keyBy", as: "useKeyBy" },
      { from: "es-toolkit/compat", name: "compact", as: "useCompact" },
      { from: "es-toolkit/compat", name: "castArray", as: "useCastArray" },
      { from: "es-toolkit/compat", name: "join", as: "useJoin" },
      { from: "es-toolkit/compat", name: "isArray" },
      { from: "es-toolkit/compat", name: "isEmpty" },
      { from: "es-toolkit/compat", name: "isEqual" },
      { from: "es-toolkit/compat", name: "isNull" },
    ],
  },
  devtools: { enabled: true },
  app: {
    head: {
      title: "Стартер для проектов на nuxt 4",
      meta: [
        { name: "description", content: "Стартер для проектов на nuxt 4" },
        { name: "keywords", content: "Стартер, nuxt 4, для проектов" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.ico" },
      ],
    },
  },
  css: [
    "~/assets/css/tailwind.css",
  ],
  runtimeConfig: {
    apiBaseUrl: NUXT_API_BASE_URL, // серверный
    public: {
      apiBaseUrl: NUXT_API_BASE_URL, // доступен и на клиенте
    },
  },
  routeRules: {},
  devServer: {
    host: "0.0.0.0",
  },
  compatibilityDate: "2025-07-15",
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});
