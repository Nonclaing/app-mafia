// types/toolkit-globals.d.ts
declare global {
  const get: typeof import("es-toolkit/compat").get;
  const map: typeof import("es-toolkit/compat").map;
  const find: typeof import("es-toolkit/compat").find;
  const keys: typeof import("es-toolkit/compat").keys;
  const merge: typeof import("es-toolkit/compat").merge;
  const isEmpty: typeof import("es-toolkit/compat").isEmpty;
  const toString: typeof import("es-toolkit/compat").toString;
}

export {};