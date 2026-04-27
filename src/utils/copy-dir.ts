import { mkdirSync, readdirSync, copyFileSync, statSync } from "fs";
import { join } from "path";

/**
 * Recursively copy all files and directories from `src` to `dest`.
 * Skips `node_modules` to avoid copying heavy dependencies.
 */
export function copyDir(src: string, dest: string): void {
  // Create destination directory
  mkdirSync(dest, { recursive: true });

  const entries = readdirSync(src);

  for (const entry of entries) {
    // Skip node_modules
    if (entry === "node_modules") continue;

    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    const stats = statSync(srcPath);

    if (stats.isDirectory()) {
      // Recurse into subdirectory
      copyDir(srcPath, destPath);
    } else {
      // Copy individual file
      copyFileSync(srcPath, destPath);
    }
  }
}
