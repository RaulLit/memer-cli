import ffmpeg from "@ffmpeg-installer/ffmpeg";
import ffmpegExec from "fluent-ffmpeg";
import { cacheWavPath, initCache } from "./storage.js";
import fs from "fs-extra";
import ora from "ora";

ffmpegExec.setFfmpegPath(ffmpeg.path);

// prevents duplicate conversions
const activeConversions = new Map();

export async function getPlayable(name, mp3Path) {

  await initCache();
  const wavPath = cacheWavPath(name);

  // already cached
  if (await fs.pathExists(wavPath))
    return wavPath;

  // if another command already converting → wait for it
  if (activeConversions.has(name))
    return activeConversions.get(name);

  // create conversion promise
  const spinner = ora(`Preparing meme "${name}"...`).start();

  const promise = new Promise((resolve, reject) => {
    ffmpegExec(mp3Path)
      .audioCodec("pcm_s16le")
      .format("wav")
      .on("end", () => {
        spinner.succeed(`Ready: ${name}`);
        activeConversions.delete(name);
        resolve(wavPath);
      })
      .on("error", (err) => {
        spinner.fail(`Failed: ${name}`);
        activeConversions.delete(name);
        reject(err);
      })
      .save(wavPath);
  });

  activeConversions.set(name, promise);
  return promise;
}
