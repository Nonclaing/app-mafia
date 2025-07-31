import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { get, find, toString } from "lodash-es";

const file = ".dev/db.json";
const adapter = new JSONFile(file);
const db = new Low(adapter, { items: [] });

export default defineEventHandler(async (event) => {
  await db.read();
  const id = toString(event.context.params?.id);
  return find(get(db.data, "items", []), { id });
});