import player from "play-sound";

const audio = player({});

export async function playAudio(file) {
  return new Promise((resolve, reject) => {
    audio.play(file, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}