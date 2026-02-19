import ffmpeg from "@ffmpeg-installer/ffmpeg";
import ffmpegExec from "fluent-ffmpeg";
import path from "path";
import fs from "fs-extra";

ffmpegExec.setFfmpegPath(ffmpeg.path);

export async function ensureWav(mp3Path) {

  const wavPath = mp3Path.replace(".mp3", ".wav");

  if (await fs.pathExists(wavPath)) return wavPath;

  await new Promise((resolve, reject) => {
    ffmpegExec(mp3Path)
      .toFormat("wav")
      .on("end", resolve)
      .on("error", reject)
      .save(wavPath);
  });

  return wavPath;
}
