// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

const NUXT_PUBLIC_API_URL = process.env.NUXT_PUBLIC_API_URL;
const sw = process.env.SW === "true";

export default defineNuxtConfig({
  modules: [
    ["@nuxtjs/device", {}],
    ["@vueuse/nuxt", {}],
    ["@nuxt/image", {}],
    ["@nuxt/eslint", {}],
    ["@nuxt/ui", {}],
    ["@vueuse/sound", {}],
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
    ["@vite-pwa/nuxt", {}],
  ],
  plugins: [
    "~/ability/plugins/abilities/index.ts",
    "~/api/plugins/bitrix-sessid/index.client.ts",
  ],
  ssr: true,
  imports: {
    imports: [
      { from: "@casl/vue", name: "useAbility" },
      { from: "vue-timer-hook", name: "useStopwatch" },
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
  colorMode: {
    preference: "dark",
    fallback: "dark",
  },
  runtimeConfig: {
    public: {
      enableRedirect: process.env.NUXT_PUBLIC_ENABLED_REDIRECT,
    },
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
  pwa: {
    strategies: "injectManifest",
    srcDir: "service-worker",
    filename: "sw.ts",
    registerType: "autoUpdate",
    manifest: {
      name: "Nuxt Vite PWA",
      short_name: "NuxtVitePWA",
      display: "fullscreen",
      prefer_related_applications: false,
      icons: [
        {
          src: "images/mafia.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "images/mafia.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "images/mafia.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    injectManifest: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 20,
    },
    experimental: {
      includeAllowlist: true,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: "/",
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
  },
});
