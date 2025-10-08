import type { CreateClientConfig } from "./.api/client";

export const createClientConfig: CreateClientConfig = (options) => {
  if (import.meta.env.DEV) return { ...options, baseURL: "http://localhost:3000" };
  return { ...options };
};
