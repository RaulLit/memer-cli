import { Player } from "cli-sound";
import { ensureWav } from "./convert.js";
import os from "os";

const player = new Player();

let stopCurrent = null;

export async function playAudio(file) {

  if (stopCurrent) {
    stopCurrent();
    stopCurrent = null;
  }

  let playable = file;

  // Windows requires wav
  if (os.platform() === "win32") {
    playable = await ensureWav(file);
  }

  stopCurrent = player.play(playable, { volume: 1.0 });
}
