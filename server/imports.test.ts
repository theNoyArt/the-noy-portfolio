import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vite-plus/test";

// Vercel compiles api/chat.ts and everything it imports file by file, and the package is
// "type": "module", so Node needs explicit extensions on relative imports at runtime.
// Without them /api/chat fails with ERR_MODULE_NOT_FOUND in production while dev still works.
describe("api/chat import graph", () => {
  it("uses .js extensions on every runtime relative import", () => {
    const missing: string[] = [];
    const seen = new Set<string>();
    const queue = ["api/chat.ts"];
    while (queue.length) {
      const file = queue.shift()!;
      if (seen.has(file)) continue;
      seen.add(file);
      const src = readFileSync(file, "utf8");
      for (const m of src.matchAll(
        /^\s*(?:import|export)\s+(type\s+)?[^;]*?from\s+"(\.[^"]+)"/gms,
      )) {
        const [, typeOnly, spec] = m;
        const target = join(dirname(file), spec.replace(/\.js$/, "") + ".ts").replace(/\\/g, "/");
        if (existsSync(target)) queue.push(target);
        if (!typeOnly && !spec.endsWith(".js")) missing.push(`${file}: "${spec}"`);
      }
    }
    expect(seen.size).toBeGreaterThan(2);
    expect(missing).toEqual([]);
  });
});
