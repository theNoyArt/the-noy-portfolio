export type Lang = "en" | "pl";
export const LANGS: Lang[] = ["en", "pl"];

/** Text in both languages. */
export type Localized = { en: string; pl: string };
export type LocalizedList = { en: string[]; pl: string[] };

/** Which side of the work a company or project belongs to: design (ux) or build (dev). */
export type Track = "ux" | "dev";
export type Stage = "research" | "design" | "frontend" | "tests";

/** Path under /public, e.g. '/images/ledgerly-hero.jpg'. null = striped placeholder. */
export type ImagePath = string | null;

export interface Link {
  label: string;
  url: string;
}

export interface Person {
  name: string;
  firstName: string;
  email: string;
  role: Localized;
  intro: Localized;
  location: Localized;
  status: Localized;
  yearsExperience: number;
  links: Link[];
  cv: { label: Localized; url: Localized };
  portrait: { primary: ImagePath; alt: ImagePath; description: Localized };
  /** Starter questions shown in the AI chat. */
  chatSuggestions: LocalizedList;
  /** Extra facts for the AI chat only (not shown on the page). */
  education?: string;
  languages?: string;
  hobbies?: string;
}

export interface AboutIntro {
  title: Localized;
  p1: Localized;
  p2: Localized;
}

export interface AboutTab {
  id: Stage;
  cap: Localized;
  desc: Localized;
  /** Methods and practices (left list). Leave empty to show only tools. */
  items: string[];
  /** Software and libraries used at this stage. */
  tools: string[];
  /** Heading for `tools`: "Tools" by default, "Tech stack" with "stack". */
  toolsLabel?: "tools" | "stack";
  /** Showcase project ids. */
  links: string[];
}

export interface Decision {
  t: Localized;
  d: Localized;
}

export interface Result {
  v: string;
  l: Localized;
}

export interface CaseImages {
  cover?: ImagePath;
  /** Theme-specific covers; used instead of cover when set. */
  coverLight?: ImagePath;
  coverDark?: ImagePath;
  hero?: ImagePath;
  flows?: ImagePath;
  ia?: ImagePath;
  wireframes?: ImagePath;
  screens?: ImagePath;
  components?: ImagePath;
  designSystem?: ImagePath;
  prototype?: ImagePath;
}

export type Severity = "high" | "medium" | "low";
export type IssueStatus = "fixed" | "progress" | "backlog";

/**
 * Real numbers for the UX audit, testing and analytics sections of a case study.
 * Leave out any part you don't have; that section is then hidden.
 */
export interface CaseMetrics {
  audit?: {
    issuesCount: number;
    screensCount: number;
    method: Localized;
    participants: Localized;
    scope: Localized;
    summary: Localized;
    /** Usability heuristics scored 1–5 before and after the redesign. */
    heuristics: { name: Localized; before: number; after: number; note: Localized }[];
    log: {
      issue: Localized;
      where: Localized;
      severity: Severity;
      effort: "S" | "M" | "L";
      status: IssueStatus;
    }[];
    reportUrl?: string;
  };
  tests?: {
    tools: string;
    unit: number;
    integration: number;
    e2e: number;
    /** e.g. '84%' */
    coverage: string;
  };
  analytics?: {
    tools: string;
    /** Four funnel steps as percentages, starting at 100. */
    funnel: [number, number, number, number];
    funnelSteps?: LocalizedList;
    session: string;
    taskSuccess: string;
  };
}

interface CaseBase {
  id: string;
  name: string;
  year: string;
  /** Colour of the striped placeholder images (0–360). */
  hue: number;
  tech: string[];
  tools: string;
  short: Localized;
  role: Localized;
  team: Localized;
  duration: Localized;
  intro: Localized;
  product: Localized;
  audience: Localized;
  problem: Localized;
  resp: Localized;
  ux: Decision[];
  ui: Decision[];
  arch: Decision[];
  challenge: Localized;
  solution: Localized;
  code: string;
  results: Result[];
  learned: Localized;
  improve: Localized;
  links?: { live?: string; source?: string };
  images?: CaseImages;
  /**
   * A hand-built case-study page instead of the standard template. The standard fields
   * still feed the showcase card, the About links and the AI chat.
   */
  page?: "dtrpg" | "tamagotchi" | "artpractice" | "portfolio";
  metrics?: CaseMetrics;
}

/** A project done at a company (pinned on the experience timeline). */
export interface CaseStudy extends CaseBase {
  tracks: Track[];
  category: Localized;
  research: Localized;
  testing: Localized;
}

/** A self-initiated or freelance project shown in Project showcase. */
export interface ShowcaseProject extends CaseBase {
  /** Shows an "In progress" chip on the showcase card. */
  inProgress?: boolean;
  /** Current stage shown on the showcase card, with how many of `steps` are reached. */
  stage?: { label: Localized; step: number; steps: number };
  type: Localized;
  origin: Localized;
  stages: Record<Stage, Localized>;
}

/** A client project at a company, shown in the company's panel (no case-study page). */
export interface WorkProject {
  id: string;
  title: Localized;
  /** Kept generic for NDA work, e.g. "Large pharma company". */
  client: Localized;
  role: Localized;
  /** Fractional years for the mini timeline: start of the first month, end of the last.
   * Leave both out when the exact dates aren't known; the bar is then hidden. */
  from?: number;
  to?: number;
  dates: Localized;
  desc: Localized;
  tags: string[];
  /** Featured projects get a full card; the rest go in a compact "Earlier" list. */
  featured?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  from: number;
  to: number | null;
  dates: Localized;
  kind: Track[];
  role: Localized;
  desc: Localized;
  resp: LocalizedList;
  tech: string[];
  projects: { id: string; at: number }[];
  /** Client projects at this company, newest first. */
  work?: WorkProject[];
  /** Shown instead of a project list when there are no projects, or under the work list. */
  note?: Localized;
}

export interface Activity {
  id: string;
  title: Localized;
  meta: Localized;
  /** One or two sentences. */
  desc: Localized;
  /** Short topic tags shown as chips. */
  topics: Localized[];
  /** Links at the bottom of the card. A "#/case/<id>" url opens that case study. */
  links: { label: Localized; url: string }[];
  /** Optional compact list of events. */
  events?: ActivityEvent[];
  /** Optional highlight numbers. */
  stats?: { v: string; l: Localized }[];
}

export interface ActivityEvent {
  /** e.g. "2025"; leave "" when unknown. */
  year: string;
  title: string;
  place?: Localized;
  kind: Localized;
  url?: string;
}
