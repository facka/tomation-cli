import { existsSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { copyDir } from "../utils/copy-dir.js";
import { replaceInFiles } from "../utils/replace-in-files.js";

// Resolve the path to the bundled templates directory relative to this file
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const TEMPLATES_DIR = resolve(__dirname, "../../templates");

export function createProject(projectName: string): void {
  // Validate project name
  if (!projectName || projectName.trim() === "") {
    console.error("Error: project name cannot be empty.");
    process.exit(1);
  }

  const targetDir = resolve(process.cwd(), projectName);

  // Ensure the folder does not already exist
  if (existsSync(targetDir)) {
    console.error(`Error: folder "${projectName}" already exists.`);
    process.exit(1);
  }

  const templateDir = resolve(TEMPLATES_DIR, "playground");

  console.log(`Creating project "${projectName}"...`);

  // Copy template files into the new project folder
  copyDir(templateDir, targetDir);

  // Replace the __PROJECT_NAME__ placeholder with the actual project name
  replaceInFiles(targetDir, "__PROJECT_NAME__", projectName);

  console.log(`✅ Project "${projectName}" created successfully!`);
  console.log("");
  console.log("Next steps:");
  console.log(`  cd ${projectName}`);
  console.log("  npm install");
  console.log("  npm run live-server");
}
