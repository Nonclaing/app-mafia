import { includes, first } from "es-toolkit/compat";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const enabledRedirect = config.public.enableRedirect === "true";
  if (process.env.NODE_ENV === "development" && enabledRedirect) return; // Отключение редиректов при разработке (для тестирования)

  const router = useRouter();
  const route = useRoute();

  const getReplaceRoute = (path: string): string => {
    const routeStore = useStageStore();
    const availableRoutes = routeStore.availableRoutes;
    if (!includes(availableRoutes, path)) return first(availableRoutes)!;
    return "";
  };

  nuxtApp.hook("app:beforeMount", () => {
    const path = getReplaceRoute(route.path);
    if (path) router.replace(path!);

    router.beforeEach((to) => {
      const path = getReplaceRoute(to.path);
      if (path) return { path, replace: true };
      return true;
    });
  });
});
