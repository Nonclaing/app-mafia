import { joinURL } from "ufo";

export const useAssetUrl = (path: string) => {
  const config = useRuntimeConfig();
  return joinURL(config.app.baseURL, path);
};
