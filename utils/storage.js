import os from "os";
import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";

/* -------------------------------------------------- */
/* PATH RESOLUTION                                    */
/* -------------------------------------------------- */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// project root (works after npm global install)
export const PACKAGE_ROOT = path.resolve(__dirname, "..");

// user storage
export const CACHE_DIR = path.join(path.join(PACKAGE_ROOT, "sounds"), "cache");
export const DEFAULT_MEME_DIR = path.join(PACKAGE_ROOT, "sounds", "default");

/* -------------------------------------------------- */
/* HELPERS                                            */
/* -------------------------------------------------- */

const stripExt = (file) => path.parse(file).name;

async function safeReadMp3Names(dir) {
  try {
    if (!(await fs.pathExists(dir))) return [];

    const files = await fs.readdir(dir);
    return files.filter(f => f.endsWith(".mp3")).map(stripExt);

  } catch {
    // never crash CLI because of filesystem
    return [];
  }
}

/* -------------------------------------------------- */
/* STORAGE INIT                                       */
/* -------------------------------------------------- */

export async function initCache() {
  await fs.ensureDir(CACHE_DIR);
}

/* -------------------------------------------------- */
/* LOCAL MEMES                                        */
/* -------------------------------------------------- */

export function localMemePath(name) {
  return path.join(DEFAULT_MEME_DIR, `${name}.mp3`);
}

/* -------------------------------------------------- */
/* DEFAULT MEMES (CACHED)                             */
/* -------------------------------------------------- */

let cachedDefaults = null;

export async function getDefaultMemes() {
  if (cachedDefaults) return cachedDefaults;

  cachedDefaults = await safeReadMp3Names(DEFAULT_MEME_DIR);
  return cachedDefaults;
}

export function cacheWavPath(name) {
  return path.join(CACHE_DIR, `${name}.wav`);
}