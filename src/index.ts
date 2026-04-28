#!/usr/bin/env node

import { existsSync } from "fs";
import { spawn } from "child_process";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { createProject } from "./commands/create.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

function runDevCommand(): void {
  const candidates = [
    resolve(__dirname, "./commands/dev.js"),
    resolve(__dirname, "../src/commands/dev.js")
  ];

  const scriptPath = candidates.find(candidate => existsSync(candidate));

  if (!scriptPath) {
    console.error("Error: could not find commands/dev.js.");
    process.exit(1);
  }

  const child = spawn(process.execPath, [scriptPath], {
    stdio: "inherit",
    env: process.env
  });

  child.on("exit", code => {
    process.exit(code ?? 0);
  });

  child.on("error", err => {
    console.error(`Error: failed to start dev command: ${err.message}`);
    process.exit(1);
  });
}

// Parse CLI arguments: node dist/index.js <command> [args...]
const [, , command, ...args] = process.argv;

if (command === "create") {
  const projectName = args[0];

  if (!projectName) {
    console.error("Error: project name is required.");
    console.error("Usage: tomation create <project-name>");
    process.exit(1);
  }

  createProject(projectName);
} else if (command === "dev") {
  runDevCommand();
} else {
  console.log("tomation-cli — create starter projects for the Tomation framework");
  console.log("");
  console.log("Usage:");
  console.log("  tomation create <project-name>");
  console.log("  tomation dev");
  console.log("");
  console.log("Commands:");
  console.log("  create    Create a new Tomation project from the playground template");
  console.log("  dev       Run the live dev server");
}
