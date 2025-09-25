import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "./app/api/openapi.yml",
  output: "./app/api/.api",
  plugins: [
    "zod",
    "@hey-api/client-axios",
    { name: "@hey-api/sdk", validator: true },
  ],
});
