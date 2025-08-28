import { abilitiesPlugin } from "@casl/vue";
import { type AppAbility, defineAbilityFor } from "./services/ability";
import getAuthProfile from "~/api/services/auth/profile";

export default defineNuxtPlugin(async (nuxtApp) => {
  const user = await getAuthProfile();
  const ability: AppAbility = defineAbilityFor(user);
  nuxtApp.vueApp.use(abilitiesPlugin, ability, { useGlobalProperties: true });
});
