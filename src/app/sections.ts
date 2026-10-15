import type { Stage, Track } from "../content/types";
import type { UIStrings } from "../content/ui";
import type { ResolvedCase } from "../lib/cases";

/** Home page sections, in order. The DOM id is `s-<key>`. */
export const HOME_SECTIONS = ["home", "about", "showcase", "experience", "other"] as const;
export type HomeSection = (typeof HOME_SECTIONS)[number];

export function homeSectionLabel(key: HomeSection, t: UIStrings): string {
  return key === "other" ? t.otherNav : t[key];
}

export type CaseSectionId =
  | "overview"
  | "context"
  | "research"
  | "audit"
  | "dsglass"
  | "dscyber"
  | "build"
  | "outcome"
  | "testing"
  // Custom case-study layouts (see CaseBase.page)
  | "wireframes"
  | "system"
  | "mockups"
  | "stack"
  | "api"
  | "idea"
  | "process"
  | "features"
  | "design"
  | "flow"
  | "lessons"
  | "explore"
  | "attachment"
  | "inspirations"
  | "concept"
  | "roadmap";

export interface CaseSection {
  id: CaseSectionId;
  /** DOM id. */
  dom: string;
  num: string;
  label: string;
  track: Track | null;
}

const ORDER: { id: CaseSectionId; key: keyof UIStrings; track: Track | null }[] = [
  { id: "overview", key: "overview", track: null },
  { id: "context", key: "context", track: null },
  { id: "research", key: "uxr", track: "ux" },
  { id: "audit", key: "audit", track: "ux" },
  { id: "design", key: "uid", track: "ux" },
  { id: "build", key: "devl", track: "dev" },
  { id: "outcome", key: "outcome", track: null },
  { id: "testing", key: "testan", track: null },
];

/** DriveThruRPG: its own section list (src/pages/dtrpg). */
const DTRPG_ORDER: { id: CaseSectionId; key: keyof UIStrings; track: Track | null }[] = [
  { id: "overview", key: "overview", track: null },
  { id: "audit", key: "audit", track: "ux" },
  { id: "wireframes", key: "wireframes", track: "ux" },
  { id: "system", key: "designSystem", track: "ux" },
  { id: "mockups", key: "mockups", track: "ux" },
  { id: "stack", key: "frontEnd", track: "dev" },
  { id: "api", key: "mockApi", track: "dev" },
];

/** Tamagotchi game: its own section list (src/pages/tamagotchi). */
const TG_ORDER: { id: CaseSectionId; key: keyof UIStrings; track: Track | null }[] = [
  { id: "overview", key: "overview", track: null },
  { id: "idea", key: "tgIdea", track: null },
  { id: "attachment", key: "tgAttachment", track: "ux" },
  { id: "concept", key: "tgConcept", track: "ux" },
  { id: "inspirations", key: "tgInspirations", track: "ux" },
  { id: "roadmap", key: "tgRoadmap", track: null },
];

/** Art practice assistant (src/pages/artpractice). */
const AP_ORDER: { id: CaseSectionId; key: keyof UIStrings; track: Track | null }[] = [
  { id: "overview", key: "overview", track: null },
  { id: "idea", key: "tgIdea", track: null },
  { id: "flow", key: "apFlow", track: "ux" },
  { id: "lessons", key: "apLessons", track: null },
  { id: "explore", key: "apResearch", track: "ux" },
  { id: "roadmap", key: "apNext", track: null },
];

/** Portfolio website (src/pages/portfolio). */
const PF_ORDER: { id: CaseSectionId; key: keyof UIStrings; track: Track | null }[] = [
  { id: "overview", key: "overview", track: null },
  { id: "wireframes", key: "wireframes", track: "ux" },
  { id: "design", key: "designSystem", track: "ux" },
  { id: "stack", key: "frontEnd", track: "dev" },
];

/** The sections a case study shows. The audit only appears when there is audit data. */
export function caseSections(c: ResolvedCase, t: UIStrings): CaseSection[] {
  const own = { dtrpg: DTRPG_ORDER, tamagotchi: TG_ORDER, artpractice: AP_ORDER, portfolio: PF_ORDER } as const;
  if (c.page)
    return own[c.page].map((s, i) => ({
      id: s.id,
      dom: "c-" + s.id,
      num: String(i + 1).padStart(2, "0"),
      label: String(t[s.key]),
      track: s.track,
    }));
  return ORDER.filter((s) => s.id !== "audit" || !!c.metricsResolved.audit).map((s, i) => ({
    id: s.id,
    dom: "c-" + s.id,
    num: String(i + 1).padStart(2, "0"),
    label: String(t[s.key]),
    track: s.track,
  }));
}

/** Where an About stage link lands inside a case study. */
export const STAGE_SECTION: Record<Stage, CaseSectionId> = {
  research: "research",
  design: "design",
  frontend: "build",
  tests: "testing",
};
