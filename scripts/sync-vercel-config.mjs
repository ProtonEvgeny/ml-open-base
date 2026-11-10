#!/usr/bin/env node
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";

const GENERATED_FILE = "dist/vercel.json";
const TARGET_FILE = "vercel.json";

/**
 * Build settings Vercel must apply to a Git-connected project. Vercel reads
 * `vercel.json` only from the repository root, never from the output directory,
 * so the headers and redirects Blume writes into `dist/vercel.json` are copied
 * here. `npm run vercel:sync` refreshes them, `npm run vercel:check` (CI) fails
 * on drift.
 */
const BUILD_SETTINGS = {
  $schema: "https://openapi.vercel.sh/vercel.json",
  framework: null,
  buildCommand: "npm run build",
  installCommand: "npm ci",
  outputDirectory: "dist",
  trailingSlash: false,
};

const checkOnly = process.argv.includes("--check");

if (!existsSync(GENERATED_FILE)) {
  console.error(
    `Missing ${GENERATED_FILE}. Run \`npm run build\` before \`npm run vercel:${
      checkOnly ? "check" : "sync"
    }\`.`
  );
  process.exit(1);
}

const generated = JSON.parse(await readFile(GENERATED_FILE, "utf8"));
const next = {
  ...BUILD_SETTINGS,
  redirects: generated.redirects ?? [],
  headers: generated.headers ?? [],
};
const nextText = `${JSON.stringify(next, null, 2)}\n`;

if (checkOnly) {
  const current = existsSync(TARGET_FILE)
    ? await readFile(TARGET_FILE, "utf8")
    : "";
  if (current !== nextText) {
    console.error(
      `${TARGET_FILE} is out of sync with ${GENERATED_FILE}.\n` +
        "Run `npm run vercel:sync` and commit the updated file."
    );
    process.exit(1);
  }
  console.log(`${TARGET_FILE} matches ${GENERATED_FILE}.`);
  process.exit(0);
}

await writeFile(TARGET_FILE, nextText, "utf8");
console.log(`Wrote ${TARGET_FILE} from ${GENERATED_FILE}.`);
