import { abilitiesPlugin } from "@casl/vue";
import getAbility from "~/ability";

export default defineNuxtPlugin(async (nuxtApp) => {
  const ability = await getAbility();
  nuxtApp.vueApp.use(abilitiesPlugin, ability, { useGlobalProperties: true });
});
