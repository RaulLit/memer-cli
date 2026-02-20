import ffmpeg from "@ffmpeg-installer/ffmpeg";
import { spawn } from "child_process";
import { cacheWavPath, initCache } from "./storage.js";
import fs from "fs-extra";
import ora from "ora";

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

    const ff = spawn(ffmpeg.path, ["-y", "-i", mp3Path, "-acodec", "pcm_s16le", "-ar", "44100", "-ac", "2", wavPath]);

    ff.on("close", (code) => {
      activeConversions.delete(name);

      if (code === 0) {
        spinner.succeed(`Ready: ${name}`);
        resolve(wavPath);
      } else {
        spinner.fail(`Failed: ${name}`);
        reject(new Error("Conversion Failed"));
      }
    });

    // comment this after testing
    ff.stderr.on("data", data => {
      console.log(data.toString());
    });

    ff.on("error", reject);
  });

  activeConversions.set(name, promise);
  return promise;
}
