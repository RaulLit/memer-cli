import path from "path";
import { playAudio } from "../utils/audio.js";
import { localMemePath } from "../utils/storage.js";
import { fileURLToPath } from "url";
import fs from "fs-extra";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// go one level up -> package root
const PACKAGE_ROOT = path.join(__dirname, "..");

export async function play(name) {
  try {
    const localPath = localMemePath(name);

    if (await fs.pathExists(localPath)) {
      return playAudio(localPath);
    }

    // 2️⃣ fallback to bundled default meme
    const defaultPath = path.join(
      PACKAGE_ROOT,
      "sounds",
      "default",
      `${name}.mp3`
    );

    if (await fs.pathExists(defaultPath)) {
      return playAudio(defaultPath);
    }
    
    console.log("Meme not found locally. Try: meme get " + name);
  } catch {
    const defaultPath = path.join(process.cmd(), "node_modules/meme-cli/sounds/default", `${name}.mp3`);
    await playAudio(defaultPath);
  }
}