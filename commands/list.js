import chalk from "chalk";
import { getLocalMemes } from "../utils/storage.js";
import { fetchRemoteMemes } from "../utils/registry.js";

export async function list(remote) {
  if (remote) {
    const memes = await fetchRemoteMemes();

    console.log(chalk.cyan("\nAvailable Online Memes: \n"));
    memes.forEach(m => console.log("-", m));
  } else {
    const memes = await getLocalMemes();

    if (!memes.length) return console.log(chalk.red("\nNo memes downloaded\n"));

    console.log(chalk.green("\nDownloaded Memes: \n"));
    memes.forEach(m => console.log("-", m));
  }
}