import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { get } from "lodash-es";

const file = ".dev/db.json";
const adapter = new JSONFile(file);
const db = new Low(adapter, { items: [] });

export default defineEventHandler(async () => {
  await db.read();
  return get(db.data, "items", []);
});