import type { Profile } from "~/api";
import type { MongoAbility } from "@casl/ability";
import { AbilityBuilder, createMongoAbility, createAliasResolver } from "@casl/ability";

export type AppAbility = MongoAbility;

const resolveAction = createAliasResolver({
  [ActionType.CRUD]: [ActionType.Create, ActionType.Read, ActionType.Update, ActionType.Delete],
});

export function defineAbilityFor(user: Profile) {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  if (user.role === "admin") {
    can(ActionType.Manage, SubjectType.All); // админ может всё
  }
  else {
    can(ActionType.Read, SubjectType.Item);
    cannot(ActionType.Delete, SubjectType.Item);
  }

  return build({ resolveAction });
}
