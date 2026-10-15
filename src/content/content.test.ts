import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vite-plus/test";
import { ABOUT, ABOUT_TABS } from "./about";
import { ACTIVITIES, HOBBIES } from "./activities";
import { AP } from "./artpractice";
import { EXPERIENCE } from "./experience";
import { PERSON } from "./person";
import { PF, PF_FACTS, PF_WIRES } from "./portfolioCase";
import { SHOWCASE, SHOWCASE_UPCOMING } from "./showcase";
import { TG } from "./tamagotchi";
import { UI } from "./ui";

// Tests run from the project root.
const PUBLIC = join(process.cwd(), "public");

/** Every { en, pl } text in a value, with the path it was found at. */
function texts(value: unknown, path = "", out: { path: string; en: unknown; pl: unknown }[] = []) {
  if (Array.isArray(value)) value.forEach((v, i) => texts(v, `${path}[${i}]`, out));
  else if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    if ("en" in o && "pl" in o && Object.keys(o).length === 2) out.push({ path, en: o.en, pl: o.pl });
    else for (const [k, v] of Object.entries(o)) texts(v, path ? `${path}.${k}` : k, out);
  }
  return out;
}

const CONTENT = { PERSON, ABOUT, ABOUT_TABS, ACTIVITIES, HOBBIES, EXPERIENCE, SHOWCASE, SHOWCASE_UPCOMING, TG, AP, PF, PF_FACTS, PF_WIRES };

describe("content", () => {
  it("has every text in both English and Polish", () => {
    const missing = texts(CONTENT)
      .filter((x) => {
        const en = Array.isArray(x.en) ? x.en.length : typeof x.en === "string" ? x.en.trim().length : 1;
        const pl = Array.isArray(x.pl) ? x.pl.length : typeof x.pl === "string" ? x.pl.trim().length : 1;
        return (en > 0) !== (pl > 0);
      })
      .map((x) => x.path);
    expect(missing).toEqual([]);
  });

  it("has the same interface strings in both languages", () => {
    expect(Object.keys(UI.pl).sort()).toEqual(Object.keys(UI.en).sort());
  });

  it("offers the same number of chat suggestions in each language", () => {
    expect(PERSON.chatSuggestions.pl).toHaveLength(PERSON.chatSuggestions.en.length);
  });

  it("uses unique showcase ids", () => {
    const ids = SHOWCASE.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("only points to images and files that exist", () => {
    const paths = [
      PERSON.cv.url,
      ...SHOWCASE.flatMap((s) => [s.images?.cover, s.images?.coverLight, s.images?.coverDark]),
    ].filter((p): p is string => typeof p === "string" && p.startsWith("/"));
    const missing = paths.filter((p) => !existsSync(join(PUBLIC, p)));
    expect(missing).toEqual([]);
  });

  it("keeps the experience timeline consistent", () => {
    for (const x of EXPERIENCE) {
      expect(x.from).toBeLessThanOrEqual(x.to ?? new Date().getFullYear() + 1);
      expect(x.kind.length).toBeGreaterThan(0);
    }
  });

  it("keeps Bond's roadmap progress between 0 and 100", () => {
    for (const phase of TG.roadmap) {
      const p = (phase as { progress?: number }).progress ?? 0;
      expect(p).toBeGreaterThanOrEqual(0);
      expect(p).toBeLessThanOrEqual(100);
    }
  });

  it("numbers each wireframe with a note for every pin", () => {
    // Pins on the frames: home 8, project 11, home mobile 8, project mobile 7.
    expect(PF_WIRES.home).toHaveLength(8);
    expect(PF_WIRES.project).toHaveLength(11);
    expect(PF_WIRES.homeMobile).toHaveLength(8);
    expect(PF_WIRES.projectMobile).toHaveLength(7);
  });
});
