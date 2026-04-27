// scripts/live-server.js
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, "../src");
const distDir = path.join(__dirname, "../dist");
const fileToServe = path.join(distDir, "bundle.js");
const port = process.env.PORT || 5050;
let building = false;

// --- Helper: build with vite ---
function buildBundle() {
  if (building) return;
  building = true;

  console.log("🔨 Building bundle...");
  const process = exec("npx vite build");

  process.stdout.on("data", d => process.stdout.write(d));
  process.stderr.on("data", d => process.stderr.write(d));

  process.on("exit", code => {
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
  if (req.url === "/bundle.js") {
    if (!fs.existsSync(fileToServe)) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("bundle.js not built yet");
      return;
    }
    res.writeHead(200, { "Content-Type": "application/javascript" });
    fs.createReadStream(fileToServe).pipe(res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});

server.listen(port, () => {
  console.log(`🚀 Live server running at http://localhost:${port}/bundle.js`);
  buildBundle(); // initial build
});
