import chalk from "chalk";
import { getLocalMemes, getDefaultMemes } from "../utils/storage.js";
import { fetchRemoteMemes } from "../utils/registry.js";

export async function list(remote) {
  if (remote) {
    const memes = await fetchRemoteMemes();

    console.log(chalk.cyan("\nAvailable Online Memes: \n"));
    memes.forEach(m => console.log("-", m));
    return;
  } else {

    const local = await getLocalMemes();
    const defaults = await getDefaultMemes();

    if (!local.length && !defaults.length) {
      console.log(chalk.red("\nNo memes available\n"));
      return;
    }

    if (defaults.length) {
      console.log(chalk.blue("\nBuilt-in Memes:\n"));
      defaults.forEach(m => console.log("-", m));
    }

    if (local.length) {
      console.log(chalk.green("\nDownloaded Memes:\n"));
      local.forEach(m => console.log("-", m));
    }
  }
}