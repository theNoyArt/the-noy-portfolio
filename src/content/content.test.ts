import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vite-plus/test";
import { ABOUT, ABOUT_TABS } from "./about";
import { ACTIVITIES, HOBBIES } from "./activities";
import { AP } from "./artpractice";
import { EXPERIENCE } from "./experience";
import {
  ILLU_IMG,
  ILLUSTRATION,
  ILLUSTRATION_ROWS,
  ILLUSTRATIONS,
  LAYOUT_SPREADS,
} from "./illustration";
import { PERSON } from "./person";
import { PF, PF_FACTS, PF_WIRES } from "./portfolioCase";
import { SHOWCASE, SHOWCASE_UPCOMING } from "./showcase";
import { TG } from "./tamagotchi";
import { UI } from "./ui";
import { VA, VA_IMG } from "./vantgard";
import { VIEWS } from "./views";

// Tests run from the project root.
const PUBLIC = join(process.cwd(), "public");

/** Every { en, pl } text in a value, with the path it was found at. */
function texts(value: unknown, path = "", out: { path: string; en: unknown; pl: unknown }[] = []) {
  if (Array.isArray(value)) value.forEach((v, i) => texts(v, `${path}[${i}]`, out));
  else if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    if ("en" in o && "pl" in o && Object.keys(o).length === 2)
      out.push({ path, en: o.en, pl: o.pl });
    else for (const [k, v] of Object.entries(o)) texts(v, path ? `${path}.${k}` : k, out);
  }
  return out;
}

const CONTENT = {
  PERSON,
  ABOUT,
  ABOUT_TABS,
  ACTIVITIES,
  HOBBIES,
  EXPERIENCE,
  SHOWCASE,
  SHOWCASE_UPCOMING,
  TG,
  AP,
  PF,
  PF_FACTS,
  PF_WIRES,
  VA,
  VIEWS,
  ILLUSTRATION,
  ILLUSTRATIONS,
  LAYOUT_SPREADS,
};

describe("content", () => {
  it("has every text in both English and Polish", () => {
    const missing = texts(CONTENT)
      .filter((x) => {
        const en = Array.isArray(x.en)
          ? x.en.length
          : typeof x.en === "string"
            ? x.en.trim().length
            : 1;
        const pl = Array.isArray(x.pl)
          ? x.pl.length
          : typeof x.pl === "string"
            ? x.pl.trim().length
            : 1;
        return en > 0 !== pl > 0;
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
      ...Object.values(PERSON.cv).flatMap((cv) => [cv.url.en, cv.url.pl]),
      ...ACTIVITIES.flatMap((a) => (a.images ?? []).map((im) => im.src)),
      ...SHOWCASE.flatMap((s) => [s.images?.cover, s.images?.coverLight, s.images?.coverDark]),
    ].filter((p): p is string => typeof p === "string" && p.startsWith("/"));
    const missing = paths.filter((p) => !existsSync(join(PUBLIC, p)));
    expect(missing).toEqual([]);
  });

  it("offers four CVs, one per role and language, all different files", () => {
    const urls = Object.values(PERSON.cv).flatMap((cv) => [cv.url.en, cv.url.pl]);
    expect(new Set(urls).size).toBe(4);
  });

  it("lists only visible projects that exist in each home view", () => {
    const visible = SHOWCASE.filter((s) => !s.hidden).map((s) => s.id);
    for (const v of Object.values(VIEWS))
      for (const id of v.projects ?? []) expect(visible).toContain(id);
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

  it("has every Vantgard Arms text in both languages", () => {
    const empty = texts(VA)
      .filter(
        (x) => typeof x.en !== "string" || !x.en.trim() || typeof x.pl !== "string" || !x.pl.trim(),
      )
      .map((x) => x.path);
    expect(empty).toEqual([]);
  });

  it("only points the Vantgard Arms page to images that exist", () => {
    /** Every image file name in VA, plus the overview shot the page names directly. */
    const names = new Set(["after-product.webp"]);
    (function walk(v: unknown) {
      if (typeof v === "string" && v.endsWith(".webp")) names.add(v);
      else if (v && typeof v === "object") Object.values(v).forEach(walk);
    })(VA);
    expect(names.size).toBeGreaterThan(10);
    const missing = [...names].filter((n) => !existsSync(join(PUBLIC, VA_IMG, n)));
    expect(missing).toEqual([]);
  });

  it("only points the illustration page to images that exist", () => {
    const names = [...ILLUSTRATIONS, ...LAYOUT_SPREADS].flatMap((x) => {
      const set = "set" in x ? (x.set ?? []).map((s) => s.image) : [];
      return [x.image, ...set].flatMap((n) => [`${n}.webp`, `${n}-thumb.webp`]);
    });
    const missing = names.filter((n) => !existsSync(join(PUBLIC, ILLU_IMG, n)));
    expect(missing).toEqual([]);
  });

  it("gives each illustration its real image size (width and height attributes, row ratios)", () => {
    /** Width and height from a WebP header (lossy, lossless or extended). */
    const webpSize = (file: string) => {
      const b = readFileSync(join(PUBLIC, ILLU_IMG, file));
      const kind = b.toString("ascii", 12, 16);
      if (kind === "VP8X") return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
      if (kind === "VP8L") {
        const n = b.readUInt32LE(21);
        return [(n & 0x3fff) + 1, ((n >> 14) & 0x3fff) + 1];
      }
      return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
    };
    const wrong = ILLUSTRATIONS.filter((x) => {
      const [w, h] = webpSize(`${x.image}.webp`);
      return w !== x.w || h !== x.h;
    }).map((x) => x.image);
    expect(wrong).toEqual([]);
  });

  it("puts every illustration in exactly one gallery row, in order", () => {
    expect(ILLUSTRATION_ROWS.flat()).toEqual(ILLUSTRATIONS.map((x) => x.image));
  });

  it("has no upcoming placeholder cards left", () => {
    expect(SHOWCASE_UPCOMING).toEqual([]);
  });
});
