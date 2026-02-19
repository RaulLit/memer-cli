import os from "os";
import path from "path";
import fs from "fs-extra";

export const BASE_DIR = path.join(os.homedir(), ".meme-cli");

export const MEME_DIR = path.join(BASE_DIR, "memes");

export async function initStorage() {
  await fs.ensureDir(MEME_DIR);
}

export async function getLocalMemes() {
  await initStorage();
  return (await fs.readdir(MEME_DIR)).filter(f => f.endsWith(".mp3")).map(f => f.replace(".mp3", ""));
}

export function localMemePath(name) {
  return path.join(MEME_DIR, `${name}.mp3`);
}