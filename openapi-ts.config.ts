import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "./app/api/openapi.yml",
  output: "./app/api/.api",
  plugins: [
    { name: "zod" },
    { name: "@tanstack/vue-query" },
    { name: "@hey-api/sdk", validator: true },
    { name: "@hey-api/client-axios", runtimeConfigPath: "./../config" },
  ],
});
