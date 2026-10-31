// DriveThruRPG case study: the usability test (live site vs prototype). English text here is translated through ./pl.ts.

export type UtVersion = "live" | "prototype";

export const UT_PARTICIPANTS = 5;

export const UT_INTRO =
  "I tested the redesign against the live DriveThruRPG with 5 tabletop RPG players from the Imaginarium community. Each person did the same 4 tasks on both versions, in alternating order, thinking aloud (about 45 minutes, desktop).";

/** Headline numbers, live site → prototype. */
export const UT_METRICS: {
  l: string;
  live: number;
  proto: number;
  unit?: "s" | "%";
  note: string;
}[] = [
  { l: "Time to find a title", live: 175, proto: 30, unit: "s", note: "median, task 1" },
  { l: "Tasks done unaided", live: 75, proto: 100, unit: "%", note: "20 tasks per version" },
  { l: "SUS score", live: 44, proto: 84, note: "average, 0–100, typical 68" },
  { l: "Ease (SEQ)", live: 3.7, proto: 6.1, note: "average, 1–7" },
];

/** Median time per task, in seconds. */
export const UT_TASKS: { t: string; live: number; proto: number }[] = [
  { t: "Find a title", live: 175, proto: 30 },
  { t: "Settings", live: 110, proto: 25 },
  { t: "Cart", live: 65, proto: 35 },
  { t: "Library", live: 115, proto: 30 },
];

export const UT_TASKS_NOTE =
  "The cart changed the least: everyone finished it on both versions. The live cart already works reasonably well; the redesign mostly makes the total easier to see.";

/** SUS per participant (0–100). */
export const UT_SUS: { p: string; live: number; proto: number }[] = [
  { p: "P1", live: 40, proto: 87.5 },
  { p: "P2", live: 47.5, proto: 82.5 },
  { p: "P3", live: 35, proto: 85 },
  { p: "P4", live: 55, proto: 85 },
  { p: "P5", live: 42.5, proto: 80 },
];

export const susAverage = (k: "live" | "proto") =>
  UT_SUS.reduce((sum, x) => sum + x[k], 0) / UT_SUS.length;

/** Top issues: where they showed up, how many of the 5 hit them, severity 0–4. */
export const UT_ISSUES: { t: string; v: UtVersion; n: number; sev: number }[] = [
  { t: "Can’t tell adventures from other product types", v: "live", n: 2, sev: 3 },
  { t: "Currency and AI settings hidden in the footer", v: "live", n: 2, sev: 3 },
  { t: "Home page overloaded, unclear layout", v: "live", n: 2, sev: 3 },
  { t: "Results list buried under carousels on the listing", v: "live", n: 1, sev: 3 },
  {
    t: "“In your library” on the product page is less visible than on the live site",
    v: "prototype",
    n: 2,
    sev: 2,
  },
];

export const UT_CHANGES =
  "Product page: make “In your library” a clear badge next to the title and replace the buy button with “Download” for owned titles. The live site does this better today, and 2 of 5 people noticed.";

export const UT_LIMITS: string[] = [
  "5 participants show a direction, not statistical significance",
  "The prototype runs on a mock catalogue of 32 titles, the live site has many thousands, so task 1 favours the prototype",
  "I designed the prototype and moderated the sessions myself",
  "Desktop only",
];
