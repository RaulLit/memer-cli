import path from "path";
import { playAudio } from "../utils/audio.js";
import { localMemePath } from "../utils/storage.js";

export async function play(name) {
  try {
    await playAudio(localMemePath(name));
  } catch {
    const defaultPath = path.join(process.cmd(), "node_modules/meme-cli/sounds/default", `${name}.mp3`);
    await playAudio(defaultPath);
  }
}