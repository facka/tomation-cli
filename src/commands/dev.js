// scripts/live-server.js
import http from "http";
import fs from "fs";
import path from "path";
import { exec, execSync } from "child_process";

// Paths are always relative to the developer's project, not the CLI install
const projectDir = process.cwd();
const srcDir = path.join(projectDir, "src");
const distDir = path.join(projectDir, "dist");
const fileToServe = path.join(distDir, "tests.bundle.js");
const tomationConfigPath = path.join(projectDir, "tomation.config.ts");
const packageJsonPath = path.join(projectDir, "package.json");
const initialPort = Number.parseInt(process.env.PORT ?? "5050", 10) || 5050;
let building = false;

function ensureTomationProject() {
  if (!fs.existsSync(tomationConfigPath)) {
    console.error("❌ This is not a Tomation script project.");
    console.error(`Missing file: ${tomationConfigPath}`);
    process.exit(1);
  }

  if (!fs.existsSync(packageJsonPath)) {
    console.error("❌ This is not a Tomation script project.");
    console.error(`Missing file: ${packageJsonPath}`);
    process.exit(1);
  }

  let packageJson;
  try {
    packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  } catch {
    console.error("❌ Invalid package.json: could not parse JSON.");
    process.exit(1);
  }

  const dependencies = packageJson.dependencies ?? {};
  const devDependencies = packageJson.devDependencies ?? {};
  const hasTomationDependency =
    typeof dependencies.tomation === "string" || typeof devDependencies.tomation === "string";

  if (!hasTomationDependency) {
    console.error("❌ This is not a Tomation script project.");
    console.error('package.json must include "tomation" in dependencies or devDependencies.');
    process.exit(1);
  }
}

function ensureViteInstalled() {
  try {
    execSync("npx --no-install vite --version", { stdio: "ignore", cwd: projectDir });
  } catch {
    console.error("❌ Vite is not installed in this project. Run: pnpm install");
    process.exit(1);
  }
}

ensureTomationProject();
ensureViteInstalled();

if (!fs.existsSync(srcDir)) {
  console.error(`❌ Source directory not found: ${srcDir}`);
  process.exit(1);
}

// --- Helper: build with vite ---
function buildBundle() {
  if (building) return;
  building = true;

  console.log("🔨 Building bundle...");
  const child = exec("npx vite build", { cwd: projectDir });

  child.stdout.on("data", d => process.stdout.write(d));
  child.stderr.on("data", d => process.stderr.write(d));

  child.on("exit", code => {
    building = false;
    if (code === 0) console.log("✅ Build completed.");
    else console.error("❌ Build failed with code:", code);
  });
}

// --- Watch source directory ---
fs.watch(srcDir, { recursive: true }, (event, filename) => {
  if (filename.endsWith(".ts")) {
    console.log(`🌀 Detected change in ${filename}`);
    buildBundle();
  }
});

// --- Serve the built file ---
const server = http.createServer((req, res) => {
  if (req.url === "/tests.bundle.js") {
    if (!fs.existsSync(fileToServe)) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("tests.bundle.js not built yet");
      return;
    }
    res.writeHead(200, { "Content-Type": "application/javascript" });
    fs.createReadStream(fileToServe).pipe(res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});

let currentPort = initialPort;

server.on("error", err => {
  if (err.code === "EADDRINUSE") {
    console.warn(`⚠️ Port ${currentPort} is already in use. Trying ${currentPort + 1}...`);
    currentPort += 1;
    server.listen(currentPort);
    return;
  }

  console.error("❌ Server failed to start:", err.message);
  process.exit(1);
});

server.listen(currentPort, () => {
  console.log(`🚀 Live server running at http://localhost:${currentPort}/tests.bundle.js`);
  buildBundle(); // initial build
});
