import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vite-plus/test";
import { PL } from "../../content/dtrpg/pl";
import { PL_MORE } from "./tr";

// Tests run from the project root.
const SRC = join(process.cwd(), "src");

/** Every literal passed to tr("…") anywhere in src. */
function trLiterals(): { file: string; text: string }[] {
  const out: { file: string; text: string }[] = [];
  for (const file of readdirSync(SRC, { recursive: true }) as string[]) {
    if (!/\.tsx?$/.test(file) || file.endsWith(".test.ts")) continue;
    const src = readFileSync(join(SRC, file), "utf8");
    for (const m of src.matchAll(/\btr\(\s*"((?:[^"\\]|\\.)*)"/g))
      out.push({ file, text: JSON.parse(`"${m[1]}"`) });
  }
  return out;
}

describe("case-study translations (tr)", () => {
  it("has a Polish version of every text passed to tr()", () => {
    const missing = trLiterals()
      .filter(({ text }) => PL[text] === undefined && PL_MORE[text] === undefined)
      .map(({ file, text }) => `${file}: ${text}`);
    expect(missing).toEqual([]);
  });
});
