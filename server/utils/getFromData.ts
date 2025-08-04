import { JSONFile } from "lowdb/node";
import { Low } from "lowdb";
import { get } from "es-toolkit/compat";

const file = ".dev/db.json";
const adapter = new JSONFile(file);
const db = new Low(adapter, {});

export default async (path: string, defaultValue: unknown = null) => {
  await db.read();
  return get(db.data, path, defaultValue);
};