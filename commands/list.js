import chalk from "chalk";
import { getDefaultMemes } from "../utils/storage.js";

export async function list() {
  const defaults = await getDefaultMemes();

  if (!defaults.length) {
    console.log(chalk.red("\nNo memes available\n"));
    return;
  }

  if (defaults.length) {
    console.log(chalk.blue("\nBuilt-in Memes:\n"));
    defaults.forEach(m => console.log("-", m));
  }
}