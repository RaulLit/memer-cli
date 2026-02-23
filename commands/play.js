import path from "path";
import { playAudio } from "../utils/audio.js";
import { localMemePath } from "../utils/storage.js";
import fs from "fs-extra";

export async function play(name, volume = 100) {
  try {
    const localPath = localMemePath(name);

    if (await fs.pathExists(localPath)) {
      return playAudio(localPath, name, volume);
    }
    
    console.log("Meme not found locally. Try: meme list");
  } catch {
    const defaultPath = path.join(process.cmd(), "node_modules/meme-cli/sounds/default", `${name}.mp3`);
    await playAudio(defaultPath, name, volume);
  }
}