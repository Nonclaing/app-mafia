import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "./app/api/openapi.yml",
  output: "./app/api/.api",
  plugins: [
    "zod",
    "@tanstack/vue-query",
    { name: "@hey-api/client-nuxt", runtimeConfigPath: "./../app/api/config.ts" },
    { name: "@hey-api/sdk", validator: true },
  ],
});
