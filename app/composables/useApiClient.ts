import { createConfig, createClient } from "~/api/client";

let _client: ReturnType<typeof createClient> | null = null;
export default () => {
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

  client.instance.interceptors.response.use((response) => {
    const sessid = useGet(response, "data.sessid");
    if (sessid) cookie.value = sessid;
    return Promise.resolve(response);
  }, (error) => {
    const response = useGet(error, "response");
    const sessid = useGet(response, "data.sessid");
    if (sessid) cookie.value = sessid;
    return Promise.reject(error);
  },
  );

  _client = client;
  return _client;
};
