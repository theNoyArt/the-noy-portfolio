// Plain-text facts about the hand-built project pages (Bond, Art practice assistant, Portfolio
// website) for the AI chat (server/chat.ts). Built from the same content the pages render, so the
// assistant never drifts from what the visitor sees. DriveThruRPG has its own: dtrpg/chatContext.ts.

import { AP } from "./artpractice.js";
import { PF, PF_FACTS, PF_LINKS, PF_WIRES } from "./portfolioCase.js";
import { TG } from "./tamagotchi.js";

/** Keys that only drive the layout (icons, ids, colours), not facts worth telling a visitor. */
const SKIP = new Set(["id", "icon", "img", "src", "image", "hue", "c", "color", "mood"]);

/** Turns page content into compact English-only JSON: `{ en, pl }` texts become their English. */
function facts(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(facts);
  if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    if (typeof o.en === "string" && typeof o.pl === "string") return o.en;
    return Object.fromEntries(
      Object.entries(o)
        .filter(([k, v]) => !SKIP.has(k) && v !== "" && !(Array.isArray(v) && v.length === 0))
        .map(([k, v]) => [k, facts(v)]),
    );
  }
  return value;
}

function page(heading: string, summary: string, content: Record<string, unknown>): string {
  return [
    `${heading} (the page the visitor is reading now)`,
    summary,
    "Page content as JSON (progress values are percentages; status: done, active or planned):",
    JSON.stringify(facts(content)),
  ].join("\n");
}

export function bondChatContext(): string {
  const { meta, title, sub, lead, pillars, attachment, behaviours, endings, loop, states, inspirationGroups, inspirations, roadmap } = TG;
  return page(
    "BOND CASE STUDY",
    "Bond is the working title of Paulina's own Tamagotchi-inspired game, in the research & design stage. The platform (web + browser extension, web or mobile) and the tech stack aren't chosen yet. The pet art on the page is a placeholder mascot; final art is in progress.",
    { meta, title, sub, lead, pillars, attachment, behaviours, endings, loop, states, inspirationGroups, inspirations, roadmap },
  );
}

export function artPracticeChatContext(): string {
  return page(
    "ART PRACTICE ASSISTANT CASE STUDY",
    "Paulina's own app idea, in the research & design stage: an app that plans small daily drawing exercises around an artist's goal. The phone screen on the page is a sketch, not a final design.",
    { ...AP },
  );
}

export function portfolioChatContext(): string {
  const { meta, title, sub, lead, features, stack, moods } = PF;
  return page(
    "PORTFOLIO WEBSITE CASE STUDY",
    "The site the visitor is on, designed and built by Paulina; finished. Process on the page: overview, wireframes (home and project page, the project page based on the DriveThruRPG case study), one design system with two themes (Glass light and Cyber dark, with mood boards), and front end. Styling is Tailwind CSS v4 with theme variants and tailwind-variants recipes, no UI library. The AI chat runs on Gemini Flash's free tier with Groq as a backup.",
    {
      meta,
      title,
      sub,
      lead,
      overview: PF_FACTS.map(([k, v]) => `${k.en}: ${v.en}`),
      github: PF_LINKS.github || "not public yet",
      wireframes: PF_WIRES,
      designSystem: moods,
      features,
      stack,
    },
  );
}
