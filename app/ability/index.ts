import type { MongoAbility } from "@casl/ability";
import { AbilityBuilder, createMongoAbility, createAliasResolver } from "@casl/ability";
import getAuthProfile from "~/api/services/auth/profile";

export type AppAbility = MongoAbility;

const resolveAction = createAliasResolver({
  ["crud"]: ["create", "read", "update", "delete"],
});

export const defineAbilityFor = (user: { role: string }) => {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  if (user.role === "admin") {
    can("manage", "all"); // админ может всё
  }
  else {
    can("read", "Item");
    cannot("delete", "Item");
  }

  return build({ resolveAction });
};

export default async (): Promise<AppAbility> => {
  const user = await getAuthProfile();
  const role = user.role || "guest";
  return defineAbilityFor({ role });
};
