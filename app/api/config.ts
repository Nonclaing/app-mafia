import type { CreateClientConfig } from "./.api/client";

export const createClientConfig: CreateClientConfig = (options) => {
  if (process.env.NUXT_PUBLIC_API_URL) return { ...options, baseURL: process.env.NUXT_PUBLIC_API_URL };
  return { ...options };
};
