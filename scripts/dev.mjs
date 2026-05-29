/**
 * Start the dev server on port 3000. If that port is stuck on a broken process,
 * this script explains how to fix it (common on Windows with Landscape&more folder).
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const port = process.env.PORT || "3000";

async function portInUse(p) {
  try {
    const res = await fetch(`http://127.0.0.1:${p}`, { signal: AbortSignal.timeout(1500) });
    return res.status >= 500;
  } catch {
    return false;
  }
}

const broken = await portInUse(port);
if (broken) {
  console.warn(
    `\n⚠ Port ${port} is in use but returning errors (broken dev server).\n` +
      `  Stop the old process, then run dev again:\n` +
      `    npx kill-port ${port}\n` +
      `  Or close the other terminal running "next dev".\n`
  );
}

console.log(`\n→ Dev server: http://localhost:${port}\n`);
console.log("  Do not open HTML files from the folder. Use this URL in your browser.\n");

const sync = spawn(process.execPath, ["scripts/assign-named-images.mjs"], {
  cwd: root,
  stdio: "inherit",
});
sync.on("exit", (code) => {
  if (code !== 0) process.exit(code ?? 1);
  const sync2 = spawn(process.execPath, ["scripts/sync-store-images.mjs"], {
    cwd: root,
    stdio: "inherit",
  });
  sync2.on("exit", (code2) => {
    if (code2 !== 0) process.exit(code2 ?? 1);
    const next = spawn(
      process.execPath,
      [path.join(root, "node_modules", "next", "dist", "bin", "next"), "dev", "-p", port],
      { cwd: root, stdio: "inherit", env: process.env }
    );
    next.on("exit", (c) => process.exit(c ?? 1));
  });
});
