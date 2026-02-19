import { Player } from "cli-sound";
import os from "os";
import { getPlayable } from "./convert.js";

const player = new Player();
let stopCurrent = null;

export async function playAudio(file, name) {

  if (stopCurrent) stopCurrent();

  let playable = file;

  if (os.platform() === "win32") {
    playable = await getPlayable(name, file);
  }

  stopCurrent = player.play(playable, { volume: 1.0 });
}
