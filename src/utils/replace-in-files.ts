import { readdirSync, readFileSync, writeFileSync, statSync } from "fs";
import { join } from "path";

/**
 * Recursively walk through `dir` and replace all occurrences of
 * `placeholder` with `value` in every text file.
 */
export function replaceInFiles(
  dir: string,
  placeholder: string,
  value: string
): void {
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      // Recurse into subdirectory
      replaceInFiles(fullPath, placeholder, value);
    } else {
      // Read file, replace placeholder, write back
      const content = readFileSync(fullPath, "utf-8");

      if (content.includes(placeholder)) {
        const updated = content.split(placeholder).join(value);
        writeFileSync(fullPath, updated, "utf-8");
      }
    }
  }
}
