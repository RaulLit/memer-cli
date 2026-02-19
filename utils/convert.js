import ffmpeg from "@ffmpeg-installer/ffmpeg";
import ffmpegExec from "fluent-ffmpeg";
import { cacheWavPath, initCache } from "./storage.js";
import fs from "fs-extra";

ffmpegExec.setFfmpegPath(ffmpeg.path);

// fire & forget
export async function warmConvert(name, mp3Path) {

  await initCache();
  const wavPath = cacheWavPath(name);

  if (await fs.pathExists(wavPath)) return wavPath;

  ffmpegExec(mp3Path)
    .toFormat("wav")
    .on("error", () => {}) // ignore
    .save(wavPath);

  return wavPath;
}

export async function getPlayable(name, mp3Path) {
  await initCache();
  const wavPath = cacheWavPath(name);

  if (await fs.pathExists(wavPath))
    return wavPath;

  // start background conversion
  warmConvert(name, mp3Path);

  // play mp3 immediately
  return mp3Path;
}
