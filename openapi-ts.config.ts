import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "./app/api/openapi.yml",
  output: "./app/api/.api",
  plugins: ["@hey-api/client-axios"],
});
