import { createConfig, createClient } from "~~/.api/client";
import { get } from "es-toolkit/compat";

let _client: ReturnType<typeof createClient> | null = null;

export function useApiClient() {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBaseUrl as string;
  const cookie = useCookie<string | null>("BITRIX_SESSID", {
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  });

  if (_client) return _client;

  const client = createClient(createConfig({ baseURL }));

  client.instance.interceptors.request.use((config) => {
    config.params = { ...config.params, sessid: cookie.value ?? "N" };
    return config;
  });

  client.instance.interceptors.response.use((response) => response, (error) => {
    const response = get(error, "response");
    const sessid = get(response, "data.sessid");
    if (sessid) cookie.value = sessid;
    return Promise.reject(error);
  },
  );

  _client = client;
  return _client;
}

export * from "~~/.api";
