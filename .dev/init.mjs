import { writeFile, readFile, mkdir, access, constants } from "fs/promises";
import { map, range, keys, mapValues, get, uniqueId, mapKeys } from "es-toolkit/compat";
import { load } from "js-yaml";

const openapi = load(await readFile("app/api/openapi.yml", "utf-8"));
const tpl = await readFile(".dev/tpl/route.tpl.ts", "utf-8");

for (const path in openapi.paths) {
  const methods = keys(openapi.paths[path]);
  for (const method of methods) {
    const route = `server/routes/${path.replace("{", "[").replace("}", "]")}`;
    const file = `${route}/index.${method}.ts`;
    await mkdir(route, { recursive: true });
    try {
      await access(file, constants.F_OK);
    }
    catch {
      await writeFile(file, tpl);
    }
  }
}

const db = {};
for (const name in openapi.components.schemas) {
  const entry = openapi.components.schemas[name];
  db[name] = mapKeys(map(range(1), () => mapValues(get(entry, "properties"), (prop, key) => get(prop, "example", get(prop, "description", key)))), () => uniqueId());
}

try {
  await access(".dev/db.json", constants.F_OK);
}
catch {
  await writeFile(".dev/db.json", JSON.stringify(db, null, 2));
}
