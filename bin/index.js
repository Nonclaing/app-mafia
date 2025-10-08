#!/usr/bin/env node
import { execa } from "execa";
import fs from "fs-extra";
import path from "path";

const name = process.argv[2] || "my-app";
const dir = path.resolve(process.cwd(), name);

const repo = "git@gitlab.intervolga.ru:proj/frontend/boilerplates/app.nuxt.skeleton.git";
const branch = "master";

console.log(`🚀 Cloning boilerplate into ${name}...`);
await execa("git", ["clone", "-b", branch, "--depth", "1", repo, name], { stdio: "inherit" });

console.log("🧹 Removing .git...");
await fs.remove(path.join(dir, ".git"));

console.log("✅ Done! To start:");
console.log(`  cd ${name}`);
console.log("  npm install");
console.log("  npm run dev");
