import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vite-plus/test";
import { DECISION_KEYS, DT_BEFORE_AFTER, DT_DECISIONS } from "../../content/dtrpg/decisions";
import { PL } from "../../content/dtrpg/pl";
import { DT_CHAT_SUGGESTIONS, DT_FACTS, DT_TLDR } from "../../content/dtrpg/project";
import {
  UT_CHANGES,
  UT_INTRO,
  UT_ISSUES,
  UT_LIMITS,
  UT_METRICS,
  UT_TASKS,
  UT_TASKS_NOTE,
  susAverage,
} from "../../content/dtrpg/usability";
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

describe("case-study content translations", () => {
  // Content rendered through tr(variable), which the literal scan above can't see.
  const strings = [
    ...DT_TLDR.flat(),
    ...DT_FACTS.flat(),
    ...DECISION_KEYS.map(([, name]) => name),
    ...DT_DECISIONS.flatMap((d) => [d.t, ...DECISION_KEYS.map(([k]) => d[k])]),
    "Before",
    "After",
    ...DT_BEFORE_AFTER.flatMap((x) => [x.t, x.before.alt, x.before.cap, x.after.alt, x.after.cap]),
    UT_INTRO,
    UT_TASKS_NOTE,
    UT_CHANGES,
    "Live site",
    "Prototype",
    ...UT_METRICS.flatMap((m) => [m.l, m.note]),
    ...UT_TASKS.map((x) => x.t),
    ...UT_ISSUES.map((x) => x.t),
    ...UT_LIMITS,
  ];

  it("has a Polish version of the TL;DR, facts, decisions and usability test", () => {
    const missing = strings.filter((s) => PL[s] === undefined && PL_MORE[s] === undefined);
    expect(missing).toEqual([]);
  });

  it("offers the same chat suggestions in both languages", () => {
    expect(DT_CHAT_SUGGESTIONS.en.map((s) => PL[s])).toEqual(DT_CHAT_SUGGESTIONS.pl);
  });

  it("averages SUS to the scores quoted in the TL;DR", () => {
    expect(susAverage("live")).toBe(44);
    expect(susAverage("proto")).toBe(84);
  });
});
