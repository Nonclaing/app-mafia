import { JSONFile } from "lowdb/node";
import { Low } from "lowdb";
import { set } from "es-toolkit/compat";

const file = ".dev/db.json";
const adapter = new JSONFile(file);
const db = new Low(adapter, {});

export default async (path: string | string[], value: string) => {
  await db.read();
  set(db.data, path, value);
  await db.write();
};
