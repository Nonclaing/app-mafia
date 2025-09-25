import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "./app/api/openapi.yml",
  output: "./app/api/.api",
  plugins: [
    "zod",
    "@tanstack/vue-query",
    { name: "@hey-api/client-nuxt", runtimeConfigPath: "./../config" },
    { name: "@hey-api/sdk", validator: true },
  ],
});
