import { CASE_STUDIES } from "../content/caseStudies";
import { EXPERIENCE } from "../content/experience";
import { SHOWCASE } from "../content/showcase";
import type { CaseMetrics, CaseStudy, Localized, ShowcaseProject, Track } from "../content/types";

/** A case study in the one shape the case-study page renders. */
export interface ResolvedCase extends CaseStudy {
  group: "work" | "show";
  /** Company name for work projects. */
  company: string | null;
  /** "Freelance" / "Self-initiated" for showcase projects. */
  origin: Localized | null;
  /** Hidden showcase project: see ShowcaseProject.hidden. */
  hidden?: boolean;
  /** The project's real metrics; empty when it has none, so those sections stay hidden. */
  metricsResolved: CaseMetrics;
}

const BOTH_TRACKS: Track[] = ["ux", "dev"];

function fromShowcase(s: ShowcaseProject): ResolvedCase {
  return {
    ...s,
    category: s.type,
    tracks: BOTH_TRACKS,
    research: s.stages.research,
    testing: s.stages.tests,
    group: "show",
    company: null,
    origin: s.origin,
    metricsResolved: s.metrics ?? {},
  };
}

function fromWork(c: CaseStudy): ResolvedCase {
  const company = EXPERIENCE.find((x) => x.projects.some((p) => p.id === c.id))?.company ?? null;
  return { ...c, group: "work", company, origin: null, metricsResolved: c.metrics ?? {} };
}

export const WORK_CASES: ResolvedCase[] = CASE_STUDIES.map(fromWork);
export const SHOW_CASES: ResolvedCase[] = SHOWCASE.map(fromShowcase);
const ALL = [...WORK_CASES, ...SHOW_CASES];

export function getCase(id: string | null): ResolvedCase | null {
  return (id && ALL.find((c) => c.id === id)) || null;
}

/** Showcase cases without `hidden`, in showcase order. */
export const VISIBLE_SHOW_CASES = SHOW_CASES.filter((c) => !c.hidden);

/**
 * The next case in the same group (work or visible showcase), wrapping around. `order` limits
 * the showcase to a home view's projects (ids, in order). From a case outside the list, the first one.
 */
export function nextCase(c: ResolvedCase, order?: readonly string[] | null): ResolvedCase {
  const show = order
    ? order.flatMap((id) => VISIBLE_SHOW_CASES.filter((x) => x.id === id))
    : VISIBLE_SHOW_CASES;
  const group = c.group === "show" ? show : WORK_CASES;
  const i = group.findIndex((x) => x.id === c.id);
  return group[(i + 1) % group.length];
}

export function getWorkCase(id: string): ResolvedCase | undefined {
  return WORK_CASES.find((c) => c.id === id);
}
