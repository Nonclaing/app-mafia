import { createConfig, createClient } from "~~/.api/client";
import { get, set } from "es-toolkit/compat";

export * from "~~/.api";
const sessid = () => {
  if (typeof window !== "undefined") return get(window, "bx_config.sessid", "N");
  return "N";
};

const config = useRuntimeConfig();
const baseURL = config.public.apiBaseUrl as string;

const client = createClient(createConfig({ baseURL }));

client.instance.interceptors.request.use((config) => {
  config.params = { ...config.params, sessid: sessid() };
  return config;
});

client.instance.interceptors.response.use((response) => response, (error) => {
  const response = get(error, "response");
  const sessid = get(response, "data.sessid");
  if (sessid) set(window, "bx_config.sessid", sessid);
  return Promise.reject(error);
});

export default client;
