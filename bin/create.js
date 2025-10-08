#!/usr/bin/env node
import path from "path";

const name = process.argv[2] || "my-app";
const dir = path.resolve(process.cwd(), name);

console.log("Creating a new Nuxt app in", dir);
console.log("✅ Done! To start:");
console.log(`cd ${name}`);
console.log("npm install");
console.log("npm run dev");
