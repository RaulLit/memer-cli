import chalk from "chalk";
import { getLocalMemes } from "../utils/storage";
import { fetchRemoteMemes } from "../utils/registry";

export async function list(remote) {
  if (remote) {
    const memes = await fetchRemoteMemes();

    console.log(chalk.cyan("\nAvailable Online Memes: \n"));
    memes.forEach(m => console.log("-", m));
  } else {
    const memes = await getLocalMemes();

    console.log(chalk.green("\nDownloaded Memes: \n"));
    memes.forEach(m => console.log("-", m));
  }
}