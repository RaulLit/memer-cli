#!/usr/bin/env node
import { Command } from "commander";
import { play } from "./commands/play.js";
import { list } from "./commands/list.js";
import { get } from "./commands/get.js";
import { random } from "./commands/random.js";

const program = new Command();

program.name("memer").description("Terminal Meme Player");

program.command("list").action(list);

program.command("random").action(random);

program
  .argument("[name]")
  .option("-v, --volume <number>", "Volume level (0-100) Only supported by some players.", "100")
  .action((name, options) => {
    if (name) play(name, options.volume);
    else program.help();
  });

program.parse();