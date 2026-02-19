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
export const BASE_DIR = path.join(os.homedir(), ".meme-cli");
export const MEME_DIR = path.join(BASE_DIR, "memes");

// bundled defaults
const DEFAULT_MEME_DIR = path.join(PACKAGE_ROOT, "sounds", "default");

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

export async function initStorage() {
  await fs.ensureDir(MEME_DIR);
}

/* -------------------------------------------------- */
/* LOCAL MEMES                                        */
/* -------------------------------------------------- */

export async function getLocalMemes() {
  await initStorage();
  return safeReadMp3Names(MEME_DIR);
}

export function localMemePath(name) {
  return path.join(MEME_DIR, `${name}.mp3`);
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
