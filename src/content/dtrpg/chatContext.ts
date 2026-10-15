// Plain-text facts about the DriveThruRPG case study for the AI chat (server/chat.ts).
// Built from the same content the page renders, so the assistant never drifts from the page.

import { AUDIT_ITEMS, AUDIT_PAGES } from "./audit.js";
import { DS_GROUPS, DS_THEMES } from "./designSystem.js";
import { MOCKUPS } from "./mockups.js";
import {
  DT_API,
  DT_DS_FACTS,
  DT_FACTS,
  DT_FLOW,
  DT_FRONTEND,
  DT_LINKS,
  DT_PROBLEMS,
  DT_STATS,
  DT_TECH,
} from "./project.js";
import { WIREFRAMES } from "./wireframes.js";

export function dtrpgChatContext(): string {
  const links = Object.entries({
    "Live demo": DT_LINKS.demo,
    "Source on GitHub": DT_LINKS.github,
    "Figma file": DT_LINKS.figma,
    "API docs (Swagger UI)": DT_LINKS.swagger,
    "OpenAPI contract": DT_LINKS.openapi,
  })
    .filter(([, url]) => url)
    .map(([k, url]) => `${k}: ${url}`);

  const lines: string[] = [
    "DRIVETHRURPG REDESIGN CASE STUDY (the page the visitor is reading now)",
    "Summary: a UX/UI audit and modernization of the biggest tabletop-RPG marketplace, rebuilt as a working React storefront on a mock API. Every screen of the redesign is clickable: browse, filter, cart, checkout, library. Self-initiated, 2026.",
    ...DT_FACTS.map(([k, v]) => `${k}: ${v}`),
    `Design tools: ${DT_TECH.design.join(", ")}. Front-end stack: ${DT_TECH.frontend.join(", ")}.`,
    "Links: " + links.join(" | "),
    "",
    "UX AUDIT",
    "Method: heuristic evaluation of drivethrurpg.com against Nielsen's 10 usability heuristics, page by page, with research notes on each pattern.",
    "Numbers: " + DT_STATS.map((s) => `${s.v} ${s.l}`).join(", ") + " (87 insights in total).",
    "Key finding: the site feels dated because of three compounding problems:",
    ...DT_PROBLEMS.map((p, i) => `${i + 1}. ${p.t}: ${p.d}`),
    "What works: search, browse, cart and checkout are broadly consistent; none of it needs a full rebuild, it can be fixed as a component-level pass.",
    ...AUDIT_PAGES.map((p) => `Audit of ${p.label}: ${p.summary}`),
    "Insights ([page / type] title: issue → fix):",
    ...AUDIT_ITEMS.map(
      (x) =>
        `[${x.p} / ${x.t}] ${x.title}` +
        (x.issue ? `: ${x.issue} → ${x.fix}` : x.body ? `: ${x.body}` : ""),
    ),
    "",
    "WIREFRAMES (generated iteratively with Claude from the audit findings; they show structure, not final design)",
    ...WIREFRAMES.map(
      (w) =>
        `${w.label}${w.insp ? ` (${w.insp})` : ""}: ` +
        [...w.desktop, ...w.mobile].map((s) => `${s.t} – ${s.d}`).join("; "),
    ),
    "",
    "DESIGN SYSTEM",
    ...DT_DS_FACTS.map((f) => `${f.k}: ${f.b} – ${f.d}`),
    "Token names follow shadcn (background, card, popover, muted, border, input, primary), extended with primary-text, primary-solid and status colours. Light and dark swap values, never names.",
    "Why two extra brand reds: brand red fails WCAG AA as small text and under white labels, so primary-text carries red copy and primary-solid fills buttons (white text 4.6:1).",
    ...(["light", "dark"] as const).map(
      (t) =>
        `${DS_THEMES[t].label} tokens: ` +
        DS_GROUPS.flatMap((g) => g.keys)
          .map((k) => `${k} ${DS_THEMES[t].tokens[k]}${DS_THEMES[t].notes[k] ? ` (${DS_THEMES[t].notes[k]})` : ""}`)
          .join(", "),
    ),
    "",
    "MOCKUPS (12 screens, desktop and mobile, light and dark theme, with design notes from Figma)",
    ...MOCKUPS.map(
      (m) =>
        `${m.label}${m.sub ? ` (${m.sub})` : ""}: ` +
        [...m.dnotes, ...m.mnotes].map((n) => `${n.t} – ${n.d}`).join("; ") +
        (m.extra.length ? ` Not designed yet: ${m.extra.map((n) => n.t).join(", ")}.` : ""),
    ),
    "",
    "FRONT END",
    ...DT_FRONTEND.map((x) => `${x.t}: ${x.d}`),
    "",
    "MOCK API",
    "One dependency-free Node file serves generated JSON and images under /api/v1, described by an OpenAPI contract and explorable in Swagger UI.",
    ...DT_FLOW.map((s, i) => `Step ${i + 1}, ${s.t}: ${s.d}`),
    ...DT_API.map((x) => `${x.t}: ${x.d}`),
  ];
  return lines.join("\n");
}
