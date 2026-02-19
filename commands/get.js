import ora from "ora";
import { downloadMeme } from "../utils/registry";

export async function get(name) {
  const spinner = ora(`Downloading ${name}... `).start();

  try {
    await downloadMeme(name);
    spinner.succeed("Downloaded!");
  } catch {
    spinner.fail("Meme not found");
  }
}