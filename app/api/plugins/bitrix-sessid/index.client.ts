import { client } from "~/api";

export default defineNuxtPlugin(() => {
  const cookie = useCookie<string | null>("BITRIX_SESSID", {
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  });
  client.instance.interceptors.request.use((config) => {
    config.params = { ...config.params, sessid: cookie.value ?? "N" };
    return config;
  });

  client.instance.interceptors.response.use((response) => {
    if (response.data.sessid) cookie.value = response.data.sessid;
    return Promise.resolve(response);
  }, (error) => {
    if (error.response.data.sessid) cookie.value = error.response.data.sessid;
    return Promise.reject(error);
  });
});
