import { Player } from "cli-sound";
import os from "os";
import { getPlayable } from "./convert.js";

const player = new Player();
let stopCurrent = null;

export async function playAudio(file, name, volume = 100) {

  if (stopCurrent) stopCurrent();

  let playable = file;

  if (os.platform() === "win32") {
    playable = await getPlayable(name, file);
  }

  const normalizedVolume = Math.max(0, Math.min(100, parseInt(volume))) / 100;
  stopCurrent = player.play(playable, { volume: normalizedVolume });
}
