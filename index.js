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

program.argument("[name]").action((name) => {
  if (name) play(name);
  else program.help();
});

program.parse();