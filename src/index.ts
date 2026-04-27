#!/usr/bin/env node

import { createProject } from "./commands/create.js";

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
} else {
  console.log("tomation-cli — create starter projects for the Tomation framework");
  console.log("");
  console.log("Usage:");
  console.log("  tomation create <project-name>");
  console.log("");
  console.log("Commands:");
  console.log("  create    Create a new Tomation project from the playground template");
}
