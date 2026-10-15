import { CONFIG } from "../config";
import { CASE_STUDIES } from "../content/caseStudies";
import { EXPERIENCE } from "../content/experience";
import { SHOWCASE } from "../content/showcase";
import type { CaseMetrics, CaseStudy, Localized, ShowcaseProject, Track } from "../content/types";
import { placeholderMetrics } from "./placeholderMetrics";

/** A case study in the one shape the case-study page renders. */
export interface ResolvedCase extends CaseStudy {
  group: "work" | "show";
  /** Company name for work projects. */
  company: string | null;
  /** "Freelance" / "Self-initiated" for showcase projects. */
  origin: Localized | null;
  metricsResolved: CaseMetrics;
  metricsArePlaceholder: boolean;
}

const BOTH_TRACKS: Track[] = ["ux", "dev"];

function resolveMetrics(
  c: CaseStudy | ShowcaseProject,
): Pick<ResolvedCase, "metricsResolved" | "metricsArePlaceholder"> {
  if (c.metrics) return { metricsResolved: c.metrics, metricsArePlaceholder: false };
  if (CONFIG.showPlaceholderMetrics)
    return { metricsResolved: placeholderMetrics(c), metricsArePlaceholder: true };
  return { metricsResolved: {}, metricsArePlaceholder: false };
}

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
    ...resolveMetrics(s),
  };
}

function fromWork(c: CaseStudy): ResolvedCase {
  const company = EXPERIENCE.find((x) => x.projects.some((p) => p.id === c.id))?.company ?? null;
  return { ...c, group: "work", company, origin: null, ...resolveMetrics(c) };
}

export const WORK_CASES: ResolvedCase[] = CASE_STUDIES.map(fromWork);
export const SHOW_CASES: ResolvedCase[] = SHOWCASE.map(fromShowcase);
const ALL = [...WORK_CASES, ...SHOW_CASES];

export function getCase(id: string | null): ResolvedCase | null {
  return (id && ALL.find((c) => c.id === id)) || null;
}

/** The next case in the same group (work or showcase), wrapping around. */
export function nextCase(c: ResolvedCase): ResolvedCase {
  const group = c.group === "show" ? SHOW_CASES : WORK_CASES;
  const i = group.findIndex((x) => x.id === c.id);
  return group[(i + 1) % group.length];
}

export function getWorkCase(id: string): ResolvedCase | undefined {
  return WORK_CASES.find((c) => c.id === id);
}
