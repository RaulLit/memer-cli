import { getLocalMemes } from "../utils/storage";
import { play } from "./play";

export async function random() {
  const memes = await getLocalMemes();
  if (!memes.length) return console.log("No memes downloaded");

  const pick = memes[Math.floor(Math.random * memes.length)];
  await play(pick);
}