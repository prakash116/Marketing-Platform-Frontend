// Copies `public/` and `.next/static` into the standalone output so
// `node .next/standalone/server.js` can serve them without a CDN.
// Plain Node so it behaves the same in PowerShell, Git Bash and CI.
import { cpSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standalone = join(root, ".next", "standalone");

if (!existsSync(standalone)) {
  console.error(`Standalone output not found at ${standalone}. Run "next build" first.`);
  process.exit(1);
}

// public/ is empty in a fresh checkout (git does not track empty folders), so it is optional.
const publicDir = join(root, "public");
if (existsSync(publicDir)) {
  cpSync(publicDir, join(standalone, "public"), { recursive: true });
}
cpSync(join(root, ".next", "static"), join(standalone, ".next", "static"), { recursive: true });
