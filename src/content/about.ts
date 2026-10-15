import type { AboutIntro, AboutTab } from "./types";

export const ABOUT: AboutIntro = {
  title: {
    en: "I work where design meets technology.",
    pl: "Pracuję tam, gdzie design spotyka technologię.",
  },
  p1: {
    en: "I started as a front-end developer, building React and Angular apps for e-commerce, healthcare, automotive and fintech. Then I spent several years in UX/UI: research, audits, design systems and mentoring junior designers. Now I’m returning to front-end development, building production-style React apps with a modern stack and an AI-assisted workflow with Claude Code. Outside work: illustration and 3D art, tabletop RPGs, photography and backpacking.",
    pl: "Zaczynałam jako front-end developerka, budując aplikacje w React i Angularze dla e-commerce, medycyny, motoryzacji i fintechu. Potem przez kilka lat zajmowałam się UX/UI: badaniami, audytami, design systemami i mentoringiem młodszych projektantów. Teraz wracam do front-endu i buduję aplikacje w React w nowoczesnym stacku, pracując z Claude Code. Poza pracą: ilustracja i grafika 3D, gry fabularne, fotografia i podróże z plecakiem.",
  },
  p2: {
    en: "Pick a stage to see how I approach it, the methods and tools I use, and where it shows in my work.",
    pl: "Wybierz etap, aby zobaczyć, jak do niego podchodzę, jakich metod i narzędzi używam i gdzie widać go w moich projektach.",
  },
};

// The four stages shown as tabs in About. `links` are showcase project ids;
// clicking one opens that project scrolled to the matching stage.
export const ABOUT_TABS: AboutTab[] = [
  {
    id: "research",
    cap: { en: "Understand the problem", pl: "Zrozumieć problem" },
    desc: {
      en: "I start with the product and the people using it: UX audits against usability heuristics, user research and usability testing tell me what to fix first.",
      pl: "Zaczynam od produktu i jego użytkowników: audyty UX według heurystyk, badania i testy użyteczności mówią mi, co naprawić najpierw.",
    },
    items: ["UX audits", "User research", "Usability testing", "Heuristic evaluation", "Information architecture"],
    tools: ["Figma", "FigJam", "Miro", "Mural"],
    links: ["dtrpg"],
  },
  {
    id: "design",
    cap: { en: "Shape the solution", pl: "Kształtować rozwiązanie" },
    desc: {
      en: "Structure comes before visuals. I move from wireframes to hi-fi mockups and prototypes on a shared design system, with light and dark themes checked for WCAG contrast.",
      pl: "Struktura przed wyglądem. Przechodzę od wireframe’ów do makiet hi-fi i prototypów na wspólnym design systemie, z jasnym i ciemnym motywem sprawdzonym pod kątem kontrastu WCAG.",
    },
    items: ["Wireframes", "Lo-fi mockups", "Hi-fi mockups", "Prototyping", "Design systems", "WCAG contrast"],
    tools: ["Figma", "Figma Make", "Claude Design"],
    links: ["dtrpg"],
  },
  {
    id: "frontend",
    cap: { en: "Build it for real", pl: "Zbudować naprawdę" },
    desc: {
      en: "I build the interfaces myself: React 19 and TypeScript with TanStack, Zod and Tailwind today, and years of React and Angular in production before that.",
      pl: "Sama buduję interfejsy: dziś React 19 i TypeScript z TanStack, Zod i Tailwind, a wcześniej lata Reacta i Angulara na produkcji.",
    },
    items: ["Component architecture", "Responsive UI", "API integration", "i18n", "AI-assisted development"],
    toolsLabel: "stack",
    tools: [
      "React 19",
      "TypeScript",
      "TanStack Router & Query",
      "Zustand",
      "React Hook Form + Zod",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Angular",
      "RxJS",
      "Redux",
      "i18next",
      "Claude Code",
    ],
    links: ["dtrpg"],
  },
  {
    id: "tests",
    cap: { en: "Keep it reliable", pl: "Utrzymać niezawodność" },
    desc: {
      en: "Tests, CI and accessibility checks protect what I designed and built, so changes ship with confidence.",
      pl: "Testy, CI i kontrole dostępności chronią to, co zaprojektowałam i zbudowałam, więc zmiany trafiają na produkcję bez obaw.",
    },
    items: ["Unit testing", "Component testing", "Accessibility checks", "Continuous integration"],
    toolsLabel: "stack",
    tools: ["Vitest", "Jest", "Testing Library", "Jasmine", "GitHub Actions", "Vite+"],
    links: ["dtrpg"],
  },
];

/** How I work with teams, shown under the stages (applies to all of them). */
export const ABOUT_WORKFLOW_DESC = {
  en: "How I work with product teams, whatever the stage.",
  pl: "Jak pracuję z zespołami produktowymi, niezależnie od etapu.",
};

export const ABOUT_WORKFLOW: string[] = ["Scrum", "Agile", "Jira", "Azure DevOps", "Git", "GitHub"];
