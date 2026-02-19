#!/usr/bin/env node
import { Command } from "commander";
import { play } from "./commands/play";
import { list } from "./commands/list";
import { get } from "./commands/get";
import { random } from "./commands/random";
import dotenv from "dotenv";
dotenv.config();

const program = new Command();

program.name("meme").description("Terminal Meme Player");

program.command("list").option("-r, --remote", "Show online memes").action((opts) => list(opts.remote));

program.command("get <name>").action(get);

program.command("random").action(random);

program.argument("[name]").action(play);

program.parse();