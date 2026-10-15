// DriveThruRPG case study: links, facts and lists. English text here is translated through ./pl.ts.

const FIGMA = "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign";
const node = (id: string) => `${FIGMA}?node-id=${id}`;

/** Leave a link as "" until it exists: its button then shows as "coming soon". */
export const DT_LINKS = {
  demo: "https://drivethrurpg-redesign.paulinatargo.workers.dev/",
  github: "https://github.com/theNoyArt/drivethrurpg-redesign",
  figma: FIGMA,
  swagger: "https://drivethrurpg-mock-api.onrender.com/docs",
  openapi: "https://drivethrurpg-mock-api.onrender.com/openapi.json",
  audit: node("4218-130810"),
  wireframes: node("4239-131351"),
  colours: node("4242-1800"),
  mockupsLight: node("4271-88754"),
  mockupsDark: node("4219-130826"),
};

export const DT_IMG = "/images/dtrpg";

/** Starter questions in the AI chat while the visitor is on this case study. */
export const DT_CHAT_SUGGESTIONS = {
  en: [
    "What were the main UX problems?",
    "How does the mock API work?",
    "Why two extra brand reds?",
  ],
  pl: [
    "Jakie były główne problemy UX?",
    "Jak działa mock API?",
    "Po co dwie dodatkowe czerwienie marki?",
  ],
};

export const DT_FACTS: [string, string][] = [
  ["Product", "One of the biggest marketplaces for tabletop RPG PDFs and print-on-demand books"],
  ["Audience", "Players and game masters browsing tens of thousands of titles"],
  ["Role", "UX/UI Designer, Front-end Developer"],
  [
    "Scope",
    "Heuristic audit, wireframes, design system and final designs in Figma, React front-end build on a mock API",
  ],
  ["Duration", "2 weeks"],
];

export const DT_TECH = {
  design: ["Figma", "FigJam", "Claude"],
  frontend: [
    "React 19",
    "TypeScript",
    "TanStack Router",
    "TanStack Query",
    "Zustand",
    "react-hook-form",
    "Zod",
    "i18next",
    "Tailwind CSS v4",
    "shadcn/ui",
    "Radix",
    "Vitest",
    "Testing Library",
    "Vite+",
  ],
};

export const DT_STATS: { v: string; l: string; c?: string }[] = [
  { v: "6", l: "pages audited" },
  { v: "25", l: "critical fixes", c: "c-fix" },
  { v: "44", l: "improvements", c: "c-improvement" },
  { v: "18", l: "ideas", c: "c-idea" },
];

export const DT_PROBLEMS: { t: string; d: string }[] = [
  {
    t: "Visual inconsistency",
    d: "Brand red sits on eight or more element types, the Library uses four accent colours, and the same toggle switch means a setting, a filter and a selection.",
  },
  {
    t: "Mobile only reflows desktop",
    d: "Language, currency and theme sit about 2,000px down in the footer, and “Customers also bought” fills roughly 90% of the mobile cart.",
  },
  {
    t: "A split, incomplete filter system",
    d: "Filter buttons and Browse Categories open the same modals, and on the listing nine buttons hide every filter option until clicked.",
  },
];

export const DT_DS_FACTS: { k: string; b: string; d: string }[] = [
  { k: "Base", b: "shadcn/ui", d: "Radix primitives + Tailwind, copied into the repo" },
  { k: "Theming", b: "CSS variables", d: "One token layer drives both themes" },
  {
    k: "Themes",
    b: "Light · Dark · System",
    d: "Chosen in Preferences, follows the device by default",
  },
  { k: "Accessibility", b: "WCAG 2.x AA", d: "Every text pairing measured on its surface" },
];

/** Icon names map to the SVGs in src/pages/dtrpg/icons.tsx. */
export type DtIcon =
  | "code"
  | "link"
  | "db"
  | "layers"
  | "check"
  | "globe"
  | "palette"
  | "grid"
  | "play"
  | "wrench"
  | "server"
  | "file"
  | "spark"
  | "filecode"
  | "cloud";

export const DT_FRONTEND: { ic: DtIcon; t: string; d: string }[] = [
  { ic: "code", t: "Framework and language", d: "React 19, TypeScript" },
  { ic: "link", t: "Routing", d: "TanStack Router" },
  { ic: "db", t: "Data fetching and caching", d: "TanStack Query" },
  { ic: "layers", t: "Client state", d: "Zustand" },
  {
    ic: "check",
    t: "Forms and validation",
    d: "react-hook-form with Zod. Zod also validates API responses.",
  },
  {
    ic: "globe",
    t: "Internationalisation",
    d: "i18next, with English, Polish and a pseudo-locale (en-XA) for testing text expansion",
  },
  {
    ic: "palette",
    t: "Styling",
    d: "Tailwind CSS v4, design tokens as CSS variables, dark-first theme with a light theme",
  },
  {
    ic: "grid",
    t: "Components",
    d: "shadcn/ui (Radix primitives), WCAG AA contrast checked on tokens",
  },
  { ic: "play", t: "Testing", d: "Vitest (run through Vite+) with Testing Library" },
  {
    ic: "wrench",
    t: "Build tooling",
    d: "Vite+ (VoidZero’s unified toolchain). One vp CLI runs the dev server and production builds (Vite and Rolldown), tests (Vitest), linting (Oxlint), formatting (Oxfmt) and type checking (tsgo).",
  },
];

export const DT_FLOW: { t: string; d: string }[] = [
  { t: "Generate", d: "Python scripts build JSON data and Pillow images, written with Claude" },
  { t: "Serve", d: "server.js on Render answers /api/v1/* from that data, state in memory" },
  { t: "Describe", d: "OpenAPI 3.0.3 contract, explorable in Swagger UI at /docs" },
  {
    t: "Consume",
    d: "React app fetches with TanStack Query and validates every response with Zod",
  },
];

export const DT_API: { ic: DtIcon; t: string; d: string }[] = [
  {
    ic: "server",
    t: "Server",
    d: "A single dependency-free Node.js file (server.js, Node 18 or newer, built-in http only). It serves /api/v1/*.",
  },
  {
    ic: "file",
    t: "Data",
    d: "Static JSON files in data/, with state held in memory (follows, cart, wishlist and so on reset on restart). Polish translations are an overlay file applied per request.",
  },
  {
    ic: "spark",
    t: "Data generation",
    d: "Python 3 scripts (generate.py, then enrich.py, real.py and v4.py as later passes) build the JSON, with Pillow for images.",
  },
  {
    ic: "filecode",
    t: "Contract",
    d: "OpenAPI 3.0.3, generated into data/openapi.json. Interactive docs are served at /docs with Swagger UI.",
  },
  { ic: "cloud", t: "Hosting", d: "Render free web service" },
];
