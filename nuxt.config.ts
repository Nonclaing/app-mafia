// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

const NUXT_PUBLIC_API_URL = process.env.NUXT_PUBLIC_API_URL;

export default defineNuxtConfig({
  modules: [
    ["@nuxtjs/device", {}],
    ["@vueuse/nuxt", {}],
    ["@nuxt/image", {}],
    ["@nuxt/eslint", {}],
    ["@nuxt/test-utils/module", {}],
    ["@nuxtjs/i18n", {
      langDir: "locales/",
      strategy: "prefix_except_default",
      defaultLocale: "ru",
      locales: [
        { code: "ru", name: "Русский", iso: "ru-RU", file: "ru.json" },
      ],
    }],
    ["nuxt-es-toolkit-module", {
      prefix: "use",
      exclude: "^is|to",
      names: ["get", "map", "forEach", "size", "toPairs", "isEmpty"],
    }],
    ["@peterbud/nuxt-query", {
      devtools: true,
      autoImports: ["useQuery", "useMutation"],
      queryClientOptions: {
        defaultOptions: {
          queries: {
            refetchInterval: 5000,
            refetchOnWindowFocus: false,
          },
        },
      },
    }],
    ["nuxt-schema-org", {}],
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
  plugins: [
    "~/ability/plugins/abilities/index.ts",
    "~/api/plugins/bitrix-sessid/index.client.ts",
  ],
  ssr: true,
  imports: {
    imports: [
      { from: "@casl/vue", name: "useAbility" },
    ],
  },
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.ico" },
      ],
    },
  },
  css: [
    "~/assets/css/tailwind.css",
  ],
  runtimeConfig: {
    public: {},
  },
  routeRules: {},
  compatibilityDate: "2025-10-09",
  nitro: {
    devProxy: {
      "/rest/other": { target: `${NUXT_PUBLIC_API_URL}/rest/other`, changeOrigin: true },
    },
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});
